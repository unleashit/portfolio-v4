import Navigation from "@/components/navigation/navigation";

export default async function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header
        className="sticky-header hidden-xs-down on"
        style={{ position: "fixed", top: 0, width: "100%" }}
      >
        <div className="container-fluid">
          {/* @ts-expect-error Server Component */}
          <Navigation template="interior" ulClass="sticky-nav" />
        </div>
      </header>
      {children}
    </>
  );
}
