'use client';

import { ReactNode, useEffect } from 'react';

// this component is unfortunately neccessary due to NextJS decision
// to have Link scroll only to top of Layout instead of top of page
// https://github.com/vercel/next.js/issues/42492

function ForceScrollToTop({ children }: { children: ReactNode }) {
  useEffect(() => {
    return window.document.scrollingElement?.scrollTo(0, 0);
  }, []);
  return <>{children}</>;
}

export default ForceScrollToTop;
