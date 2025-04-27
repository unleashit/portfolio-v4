import { writeFile } from 'fs/promises';
import fs from 'node:fs';
import path from 'path';
import { STATIC_MEDIA_PATH } from '@/lib/constants';

async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error(`Failed to fetch ${url} after ${retries} attempts`);
}

export async function getImages(src: string, hidpi?: string) {
  return await Promise.all(
    [src, hidpi, src].map(async (url, i) => {
      if (!url) return null;

      const fileType = i === 0 ? 'main' : i === 1 ? 'hidpi' : 'fallback';
      const assetURL = new URL(url as string);

      const [imageID, imageFileName] = assetURL.pathname
        .split('/assets/')[1]
        .split('/');
      const [imageTitle, imageExtension] = imageFileName.split('.');

      // don't make extra thumbs for svgs
      if (imageExtension === 'svg' && fileType !== 'main') {
        return null;
      }

      let filename;

      // generate jpeg fallback from main image
      if (fileType === 'fallback') {
        assetURL.pathname = assetURL.pathname.replace(/\.webp$/, '.jpg');
        assetURL.search = assetURL.search.replace(/format=webp/, 'format=jpg');
        filename = `${imageTitle}-${fileType}-${imageID}.jpg`;
      } else {
        filename = `${imageTitle}-${fileType}-${imageID}.${imageExtension}`;
      }

      // check cache and return cached image path if it exists
      const filePath = path.join(STATIC_MEDIA_PATH, filename);
      if (fs.existsSync(filePath)) {
        return filename;
      }

      try {
        const response = await fetchWithRetry(assetURL.href);
        const buffer = await response.arrayBuffer();
        await writeFile(filePath, Buffer.from(buffer));
        return filename;
      } catch (error) {
        console.error(`Failed to fetch ${assetURL.href} image:`, error);
        return null;
      }
    }),
  );
}
