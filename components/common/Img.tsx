import { getImages } from '@/lib/services/fetchImages';
import { type ImgHTMLAttributes } from 'react';

type ImgProps = {
  src: string;
  alt: string;
  hidpi?: string;
};

async function Img({
  src,
  alt,
  hidpi = '',
  ...rest
}: ImgProps & ImgHTMLAttributes<HTMLImageElement>) {
  const [mainImg, hidpiImg, fallbackImg] = await getImages(src, hidpi);

  return mainImg?.endsWith('.svg') ? (
    <img
      src={'/assets/' + mainImg}
      {...(rest.width && { width: rest.width })}
      {...(rest.height && { width: rest.height })}
      alt={alt}
      {...rest}
    />
  ) : (
    <picture>
      {hidpiImg && (
        <source
          srcSet={`/assets/${hidpiImg} 1.1x`}
          media="(min-width: 2000px)"
          type="image/webp"
        />
      )}
      <source srcSet={'/assets/' + mainImg} type="image/webp" />

      <img
        src={'/assets/' + fallbackImg}
        {...(rest.width && { width: rest.width })}
        {...(rest.height && { width: rest.height })}
        alt={alt}
        // onError={() => setError(true)}
        {...rest}
      />
    </picture>
  );
}

export default Img;
