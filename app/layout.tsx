import { ReactNode } from 'react';
import { Metadata } from 'next';
import GlobalState from '@/components/providers';
import MobileMenu from '@/components/mobileMenu/mobileMenu';
import Navigation from '@/components/navigation/navigation';
import { Oswald, Sanchez } from 'next/font/google';
import { META_DEFAULT_DESC, META_DEFAULT_TITLE } from '@/lib/constants';
import '@/assets/scss/global.scss';

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
      <body id="home">
        <GlobalState>
          <MobileMenu>
            <Navigation template="hamburger" ulClass="responsiveNav" />
          </MobileMenu>

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
