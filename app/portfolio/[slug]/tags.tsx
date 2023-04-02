import React from "react";

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <ul className="portfolio-tags">
      {tags.map((tag, i) => (
        <li key={i} className="skill">
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default Tags;
