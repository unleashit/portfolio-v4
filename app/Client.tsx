"use client";
import { useEffect, useState } from "react";
import { Skills } from "../directus";
import { getSkills } from "./data";
import { directus } from "@/lib/services";

function Client() {
  console.log("client component called");
  const [skills, setSkills] = useState<Skills[]>();
  useEffect(() => {
    getSkills().then((s) => setSkills(s));

    directus()
      .memo("test", () =>
        fetch("https://jsonplaceholder.typicode.com/users/1").then((r) =>
          r.json()
        )
      )
      .then((d) => {
        console.log(d);
        console.log(directus().getCacheStats());
      });
  }, []);

  return skills ? (
    <div>
      <h1>client component</h1>
      {skills.map((skill) => (
        <div key={skill.title}>
          {skill.title} - {skill.sort}
        </div>
      ))}
    </div>
  ) : (
    <div>loading...</div>
  );
}

export default Client;
