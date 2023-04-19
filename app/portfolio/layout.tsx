import { ReactNode } from 'react';
import Navigation from '@/components/navigation/navigation';
import { PrimaryHeader } from '@/components/primaryHeader/primaryHeader';
import { Footer } from '@/components/footer/footer';
import ForceScrollToTop from '@/components/common/forceScrollToTop';

async function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PrimaryHeader>
        {/* @ts-expect-error Server Component */}
        <Navigation template="interior" ulClass="primaryNav" />
      </PrimaryHeader>
      <ForceScrollToTop>{children}</ForceScrollToTop>
      {/* @ts-expect-error Server Component */}
      <Footer isInterior />
    </>
  );
}

export default PortfolioLayout;
