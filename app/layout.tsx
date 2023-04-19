import { ReactNode } from 'react';
import GlobalState from '@/components/providers';
import { Oswald, Sanchez } from 'next/font/google';

// prevents flash of large icons during SSR
// https://github.com/FortAwesome/react-fontawesome/issues/134
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@/assets/scss/global.scss';
import { Metadata } from 'next';
import { META_DEFAULT_DESC, META_DEFAULT_TITLE } from '@/lib/constants';
import MobileNavigation from '@/components/mobileNavigation/mobileNavigation';
import Navigation from '@/components/navigation/navigation';

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
  return (
    <html lang="en" className={`${oswald.variable} ${sanchez.variable}`}>
      <body>
        <GlobalState>
          <MobileNavigation>
            {/* @ts-expect-error Server Component */}
            <Navigation template="hamburger" ulClass="responsiveNav" />
          </MobileNavigation>

          {children}
        </GlobalState>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: META_DEFAULT_TITLE,
    template: '%s | Jason Gallagher',
  },
  description: META_DEFAULT_DESC,
  alternates: {
    canonical: 'https://jasongallagher.org',
  },
};
