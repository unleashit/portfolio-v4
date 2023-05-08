'use client';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

function LinkToTop(
  props: PropsWithChildren<LinkProps> & {
    className?: string;
    scrollToTop?: boolean;
  }
) {
  const router = useRouter();
  const { children, scrollToTop = true, ...rest } = props;

  const onClick = () => {
    if (scrollToTop) {
      console.log('BLARG!!');
      window.scrollTo(0, 0);
    }
  };

  const click = (evt: any) => {
    evt.preventDefault();
    console.log('PING');
    router.push(props.href as string, { forceOptimisticNavigation: true });
    console.log('PONG');
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  };

  return (
    <a href={props.href as string} onClick={click}>
      {children}
    </a>
  );

  // return (
  //   <Link {...rest} onClick={onClick}>
  //     {children}
  //   </Link>
  // );
}

export default LinkToTop;
