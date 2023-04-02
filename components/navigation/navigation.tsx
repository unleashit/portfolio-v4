import React from 'react';
import Link from 'next/link';
import { getNavigation } from '../../app/data';
import { navWithCtx } from '@/components/navigation/navWithCtx';
import { assetsURL } from '@/lib/constants';

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

  return (
    <nav>
      <ul className={ulClass}>
        {navigation.map((item: any) => {
          return item.title === '##LOGO##' ? (
            <Logo key="logo" />
          ) : (
            <NavLink href={item.link} title={item.title} key={item.title} />
          );
        })}
      </ul>
    </nav>
  );
}

const NavLink = ({ href, title }: { href: string; title: string }) => (
  <li className="hidden-xs-down">
    <a href={href}>{title}</a>
  </li>
);

export function Logo() {
  return (
    <li>
      <Link href="/">
        <img
          src={`${assetsURL}/bd9a9b8d-84d1-467a-b1f8-ae646f50fb94/logo.svg`}
          alt="Jason Gallagher"
          className="jg-logo"
          width="42"
          height="42"
        />
      </Link>
    </li>
  );
}
