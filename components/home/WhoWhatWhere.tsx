import React from "react";
import { getHomeBlocks } from "../../app/data";
import { findKeyWithValue } from "@/lib/utils.new";
import { CMS } from "@/components/common/cms";
import { assetsURL } from "@/lib/constants";
import type { Blocks } from "../../directus";

export default async function WhoWhatWhere() {
  const blocks = await getHomeBlocks();
  const whoiam = findKeyWithValue(blocks, "title", "Who I Am");
  const whatido = findKeyWithValue(blocks, "title", "What I do");
  const whereiam = findKeyWithValue(blocks, "title", "Where I'm located");

  return (
    <section className="who-what-where container-fluid">
      <div className="row">
        <div className="col-md-4">
          <h3>{whoiam.title}</h3>
          <CMS html={whoiam.content} name={"whoami"} />
          <img
            src={`${assetsURL}/${whoiam.image}/who-i-am.webp?height=132&format=webp`}
            srcSet={`${assetsURL}/${whoiam.image}/who-i-am.webp?height=195&format=webp 1.1x`}
            alt={whoiam.title}
            className="who-i-am"
          />
        </div>
        <div className="col-md-4">
          <h3>{whatido?.title}</h3>
          <CMS html={whatido.content} name={"whatido"} />
          <img
            src={`${assetsURL}/${whatido.image}/what-i-do.webp?height=132&format=webp`}
            srcSet={`${assetsURL}/${whatido.image}/what-i-do.webp?height=195&format=webp 1.1x`}
            alt={whatido.title}
            className="what-i-do"
          />
        </div>
        <div className="col-md-4">
          <h3>{whereiam.title}</h3>
          <CMS html={whereiam.content} name={"whereiam"} />
          <img
            src={`${assetsURL}/${whereiam.image}/where-i-am.webp?height=132&format=webp`}
            srcSet={`${assetsURL}/${whereiam.image}/where-i-am.webp?height=195&format=webp 1.1x`}
            alt={whereiam.title}
            className="what-i-do"
          />
        </div>
      </div>
    </section>
  );
}
