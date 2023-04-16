import styles from './portfolio.module.scss';

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <ul className={styles.portfolioTags}>
      {tags.map((tag, i) => (
        <li key={i} className={styles.skill}>
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default Tags;
