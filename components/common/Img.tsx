'use client';

import { ImgHTMLAttributes, useState } from 'react';

const FallbackImg = ({
  width = '100',
  height = '100',
  bgcolor = '#ccc',
}: {
  width?: string | number;
  height?: string | number;
  bgcolor?: string;
}) => (
  <>
    <svg
      width={String(width)}
      height={String(height)}
      viewBox={`0 0 ${String(width)} ${String(height)}`}
    >
      <rect
        width={String(width)}
        height={String(height)}
        rx="2"
        ry="2"
        fill={bgcolor}
      />
    </svg>
  </>
);

function Img({
  src = '',
  width = '',
  height = '',
  alt = '',
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [error, setError] = useState(false);

  const onError = () => {
    setError(true);
  };

  //
  const legacySrc = new URL(src);
  legacySrc.pathname = legacySrc.pathname.replace(/\.webp$/, '.jpg');
  legacySrc.search = legacySrc.search.replace(/format=webp/, 'format=jpg');

  return error ? (
    <FallbackImg {...(width && { width })} {...(height && { height })} />
  ) : (
    <picture>
      <source srcSet={src} type="image/webp" />
      <img
        src={legacySrc.href}
        width={width}
        height={height}
        alt={alt}
        {...rest}
        onError={onError}
      />
    </picture>
  );
}

export default Img;
