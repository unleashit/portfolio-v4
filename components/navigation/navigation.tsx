import Link from 'next/link';

import { navWithCtx } from '@/components/navigation/navWithCtx';
import { ASSETS_URL, JG_LOGO } from '@/lib/constants';
import { getNavigation } from '../../app/data';
import styles from './navigation.module.scss';
import Img from '../common/Img';

export interface NavigationProps {
  template?: 'home' | 'interior' | 'hamburger';
  ulClass?: 'mainNav' | 'responsiveNav' | 'primaryNav';
}

export default async function Navigation({
  template = 'home',
  ulClass = 'mainNav',
}: NavigationProps) {
  const navData = await getNavigation();
  const navigation = navWithCtx(navData, template);
  const isMobile = template === 'hamburger';

  return (
    <nav>
      <ul className={styles[ulClass]}>
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
  <li className={!isMobile ? 'd-none d-md-inline-block' : undefined}>
    <Link href={href}>{title}</Link>
  </li>
);

export function Logo({ isMobile }: { isMobile: boolean }) {
  const size = isMobile ? 100 : 42;
  return (
    <li>
      <Link href="/" className={styles.logo}>
        <Img
          src={`${ASSETS_URL}/${JG_LOGO}/logo.svg`}
          alt="jg logo"
          className={isMobile ? styles.jgLogoMobile : styles.jgLogo}
          width={size}
          height={size}
        />
      </Link>
    </li>
  );
}
