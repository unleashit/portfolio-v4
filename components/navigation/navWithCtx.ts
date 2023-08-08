import type { NavigationProps } from './navigation';
import type { Navigation } from '@/services/types/directus';

export const navWithCtx = (
  links: Navigation[],
  template: NavigationProps['template'],
) => {
  const newNav: Partial<Navigation>[] = [...links];

  // `interior` template: add logo placeholder to beginning of the list
  if (template === 'interior') {
    newNav.unshift({ title: '##LOGO##' });
  }

  // `home` template: remove home link then add logo placeholder in the middle of list
  if (template === 'home') {
    newNav.shift();
    newNav.splice(Math.ceil(newNav.length / 2), 0, {
      title: '##LOGO##',
    });
  }

  // `hamburger` template: add logo placeholder to the end of the list
  if (template === 'hamburger') {
    newNav.push({ title: '##LOGO##' });
  }

  return newNav;
};
