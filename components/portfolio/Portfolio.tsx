import PortfolioItem, { ProjectWithMeta } from './PortfolioItem';
import { getProjects } from '../../app/data';
import styles from './portfolio.module.scss';

export default async function Portfolio() {
  const projects = (await getProjects()) as ProjectWithMeta[];

  if (!projects || projects.length === 0) {
    return (
      <section
        // className={this.props.animation() + "portfolio clearfix"}
        className={`${styles.portfolio} clearfix`}
        id="work"
      >
        <p>There are no projects yet.</p>
      </section>
    );
  }

  return (
    <section
      // className={this.props.animation() + "portfolio clearfix"}
      className={`${styles.portfolio}`}
      id="work"
    >
      {projects
        .sort((a, b) => +a.sort - +b.sort)
        .map((item) => {
          // const color = index % 2 ? '#000' : '#353535';
          return (
            <PortfolioItem
              key={item.title + ' thumb'}
              // color={color}
              item={item as any}
            />
          );
        })}
    </section>
  );
}
