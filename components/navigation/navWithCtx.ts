import type { NavigationProps } from './navigation';
import type { Navigation } from '@/services/types/directus';

export const navWithCtx = (
  links: Navigation[],
  template: NavigationProps['template']
) => {
  const newNav: Partial<Navigation>[] = [...links];

  if (template === 'interior') {
    newNav.unshift({ title: '##LOGO##' });
  }

  if (template === 'home') {
    newNav.shift();
    newNav.splice(Math.ceil(newNav.length / 2), 0, {
      title: '##LOGO##',
    });
  }

  if (template === 'hamburger') {
    newNav.push({ title: '##LOGO##' });
  }

  return newNav;
};
