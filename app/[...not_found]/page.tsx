import { notFound } from 'next/navigation';

/*
 * Temp fix for default not-found.tsx not working on Cloudflare Pages
 * https://stackoverflow.com/questions/75302340/not-found-page-does-not-work-in-next-js-13
 * */
export default function NotFoundCatchAll() {
  notFound();
  return null;
}
