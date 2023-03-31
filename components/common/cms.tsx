import React from "react";

export const CMS = ({
  html,
  name,
}: {
  html: string | null | undefined;
  name: string;
}) => {
  if (!html) {
    console.error(`Could not read '${name}' from CMS`);
    return null;
  }
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} className="cms-content" />
  );
};
