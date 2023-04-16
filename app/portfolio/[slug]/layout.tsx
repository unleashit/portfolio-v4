import Navigation from '@/components/navigation/navigation';
import { PrimaryHeader } from '@/components/primaryHeader/primaryHeader';
import { Footer } from '@/components/footer/footer';
import { ReactNode, Suspense } from 'react';
import Loader from '@/components/common/portfolioLoader';

export default async function PortfolioLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {/*<header*/}
      {/*  className="sticky-header hidden-xs-down on"*/}
      {/*  style={{ position: 'fixed', top: 0, width: '100%' }}*/}
      {/*>*/}
      {/*  <div className="container-fluid">*/}
      {/*    /!* @ts-expect-error Server Component *!/*/}
      {/*    <Navigation template="interior" ulClass="sticky-nav" />*/}
      {/*  </div>*/}
      {/*</header>*/}
      <PrimaryHeader>
        {/* @ts-expect-error Server Component */}
        <Navigation template="interior" ulClass="primaryNav" />
      </PrimaryHeader>
      {children}
      {/* @ts-expect-error Server Component */}
      <Footer isInterior />
    </>
  );
}
