import styles from './portfolioLoader.module.scss';

function PortfolioLoader() {
  return (
    <div className={styles.portfolioLoader}>
      <i className="fa fa-refresh fa-spin fa-5x fa-fw" />
      <div className={styles.caption}>Projects loading...</div>
    </div>
  );
}

export default PortfolioLoader;
