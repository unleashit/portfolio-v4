import logger from "@/lib/logger";
import GlobalState from "@/components/providers";
import globalMeta from "./metadata";
import { Footer } from "@/components/footer/footer";
import { Oswald, Sanchez } from "next/font/google";
const oswald = Oswald({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-oswald",
});
const sanchez = Sanchez({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sanchez",
});
import "@/assets/scss/global.scss";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  logger.info("Root Layout called");

  return (
    <html lang="en" className={`${oswald.variable} ${sanchez.variable}`}>
      <body>
        <GlobalState>{children}</GlobalState>
        {/* @ts-expect-error Server Component */}
        <Footer />
      </body>
    </html>
  );
}

export const metadata = globalMeta;

// export const dynamic = "auto"; // auto or force-dynamic
// export const dynamicParams = true
// export const revalidate = false
// export const fetchCache = 'auto'
// export const runtime = 'nodejs'
// export const preferredRegion = 'auto'
// export function generateStaticParams(...)
