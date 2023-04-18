import { ReactNode } from 'react';
import logger from '@/lib/logger';
import GlobalState from '@/components/providers';
import globalMeta from './metadata';
import { Oswald, Sanchez } from 'next/font/google';

// prevents flash of large icons during SSR
// https://github.com/FortAwesome/react-fontawesome/issues/134
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@/assets/scss/global.scss';

// prevent duplicate FA css
config.autoAddCss = false;

const oswald = Oswald({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-oswald',
});
const sanchez = Sanchez({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sanchez',
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  logger.info('Root Layout called');

  return (
    <html lang="en" className={`${oswald.variable} ${sanchez.variable}`}>
      <body>
        <GlobalState>{children}</GlobalState>
      </body>
    </html>
  );
}

export const metadata = globalMeta;

// export const dynamic = 'force-dynamic'; // auto or force-dynamic
// export const dynamicParams = true
// export const revalidate = false
// export const fetchCache = 'auto'
// export const runtime = 'nodejs'
// export const preferredRegion = 'auto'
// export function generateStaticParams(...)
