'use client';

import { ImgHTMLAttributes, useState } from 'react';
import { PLACEHOLDER_IMG } from '@/lib/constants';

function Img({
  src = '',
  width = '',
  height = '',
  alt = '',
  hidpi,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & { hidpi?: string }) {
  const [error, setError] = useState(false);

  const legacySrc = new URL(src);
  legacySrc.pathname = legacySrc.pathname.replace(/\.webp$/, '.jpg');
  legacySrc.search = legacySrc.search.replace(/format=webp/, 'format=jpg');

  // fallback image not working after server hydration (only when client mounts).
  // https://github.com/facebook/react/issues/15446
  return error ? (
    <img
      alt={alt}
      {...(width && { width })}
      {...(height && { height })}
      {...rest}
      src={PLACEHOLDER_IMG}
    />
  ) : (
    <picture>
      {hidpi && (
        <source
          srcSet={`${hidpi} 1.1x`}
          media="(min-width: 2000px)"
          type="image/webp"
        />
      )}
      <source srcSet={src} type="image/webp" />

      <img
        src={error ? PLACEHOLDER_IMG : legacySrc.href}
        width={width}
        height={height}
        alt={alt}
        onError={() => setError(true)}
        {...rest}
      />
    </picture>
  );
}

export default Img;
