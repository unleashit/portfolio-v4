import { ReactNode } from 'react';
import Navigation from '@/components/navigation/navigation';
import { PrimaryHeader } from '@/components/primaryHeader/primaryHeader';
import { Footer } from '@/components/footer/footer';

async function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PrimaryHeader>
        <Navigation template="interior" ulClass="primaryNav" />
      </PrimaryHeader>
      {children}
      <Footer isInterior />
    </>
  );
}

export default PortfolioLayout;
