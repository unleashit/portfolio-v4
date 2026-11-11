'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ComponentProps, type MouseEvent } from 'react';

type Props = ComponentProps<typeof Link>;

/**
 * A Link that guarantees the destination starts at the top of the document.
 *
 * Next.js 16 rewrote the navigation scroll handler: it walks the tree looking
 * for a scrollable element that is currently visible and deliberately bypasses
 * fixed/sticky positioned containers (see the `scroll` section of the Link
 * docs). Our header is `position: fixed`, so since 16.2 clicking "Home" or the
 * logo while already on "/" no longer scrolls anything -- the click is
 * swallowed by the bypass. Hash links (`/#about`) are unaffected because the
 * browser scrolls to the target fragment.
 *
 * Rather than depend on the framework's heuristic, scroll explicitly when the
 * link points at the route that is already on screen. Cross-page links keep
 * using Next's own scroll handling, and if upstream restores the old behavior
 * this stays correct (both end at the top).
 */
export default function ScrollToTopLink({
  children,
  href,
  onClick,
  ...rest
}: Props) {
  const pathname = usePathname();
  const target = typeof href === 'string' ? href : href.pathname;
  // Fragment targets are scrolled by the browser, not by us.
  const isCurrentRoute =
    !!target && !target.includes('#') && target.split('?')[0] === pathname;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);

    const modified =
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
    if (isCurrentRoute && !modified && !e.defaultPrevented) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <Link {...rest} href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}
