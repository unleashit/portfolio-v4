import Link from 'next/link';

import { navWithCtx } from '@/components/navigation/navWithCtx';
import { JGLogo } from '@/lib/constants';
import { getNavigation } from '../../app/data';

export interface NavigationProps {
  template?: 'home' | 'interior' | 'hamburger';
  ulClass?: string;
}

export default async function Navigation({
  template = 'home',
  ulClass = 'main-nav',
}: NavigationProps) {
  const navData = await getNavigation();
  const navigation = navWithCtx(navData, template);
  const isMobile = template === 'hamburger';

  return (
    <nav>
      <ul className={ulClass}>
        {navigation.map((item: any) => {
          return item.title === '##LOGO##' ? (
            <Logo key="logo" isMobile={isMobile} />
          ) : (
            <NavLink
              href={item.link}
              title={item.title}
              key={item.title}
              isMobile={isMobile}
            />
          );
        })}
      </ul>
    </nav>
  );
}

const NavLink = ({
  href,
  title,
  isMobile,
}: {
  href: string;
  title: string;
  isMobile: boolean;
}) => (
  <li className={!isMobile ? 'd-none d-sm-inline-block' : undefined}>
    <a href={href}>{title}</a>
  </li>
);

export function Logo({ isMobile }: { isMobile: boolean }) {
  const size = isMobile ? 100 : 42;
  return (
    <li>
      <Link href="/" className="logo">
        <img
          src={JGLogo}
          alt="Jason Gallagher"
          className={isMobile ? 'jg-logo-menu' : 'jg-logo'}
          width={size}
          height={size}
        />
      </Link>
    </li>
  );
}
