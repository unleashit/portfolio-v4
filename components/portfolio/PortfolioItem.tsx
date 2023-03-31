import React from "react";
import Link from "next/link";
import { assetsURL } from "@/lib/constants";
import { Project } from "../../directus";

const sluggify = (toSlug: string) =>
  toSlug
    .trim()
    .split(" ")
    .join("-")
    .replace(/[^a-zA-Z_-]/g, "")
    .toLowerCase();

export default function PortfolioItem({
  item,
}: // index,
// color,
{
  item: Project;
  index: any;
  color: string;
}) {
  // const color = {
  //   backgroundColor: this.props.color,
  // };
  return (
    <div className="portfolio-item">
      <Link href={"/portfolio/" + item.slug}>
        <div className="view-details">
          <span>Learn More</span>
        </div>
        <div>
          <img
            src={`${assetsURL}/${item.image_logo}/${sluggify(
              item.title
            )}.webp?format=webp`}
            alt={item.title}
          />

          <div className="portfolio-caption">
            <p>{item.decription_short}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
