import logger from "@/lib/logger";
import Navigation from "@/components/navigation/navigation";

export default async function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        {/* @ts-expect-error Server Component */}
        <Navigation template="interior" ulClass="" />
      </header>
      {children}
    </>
  );
}
