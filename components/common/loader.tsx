import React from 'react';

interface LoaderProps {
  height?: number;
  style?: React.CSSProperties;
}

const Loader = ({ height, style = {} }: LoaderProps) => {
  const finalHeight = height ? height + 'px' : 'auto';

  return (
    <div
      className="portfolio-detail-loading"
      style={{
        height: finalHeight,
        ...{ ...style },
      }}
    >
      <i className="fa-solid fa-rotate fa-spiner" />
      <div className="caption">Stay tuned...</div>
    </div>
  );
};

export default Loader;
