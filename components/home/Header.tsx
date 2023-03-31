import React from "react";
import Link from "next/link";
import Navigation from "@/components/navigation/navigation";
import { getHomeBlocks } from "../../app/data";
import { findKeyWithValue } from "@/lib/utils.new";
import { CMS } from "@/components/common/cms";
import Hamburger from "@/components/common/hamburger";
// import Hamburger from "@/components/common/hamburger";

export default async function Header() {
  const blocks = await getHomeBlocks();
  const fEE = findKeyWithValue(blocks, "title", "Front End Engineer");

  return (
    <header className="main-header">
      <Hamburger />
      {/* @ts-expect-error Server Component */}
      <Navigation />
      <div className="title-tagline-wrapper">
        <h1>{fEE.title}</h1>
        <CMS html={fEE.content} name={"front end engineer"} />
      </div>
      <div className="button-wrapper">
        <Link href="/#work">
          <button className="button button-green">See my work</button>
        </Link>
      </div>
    </header>
  );
}
