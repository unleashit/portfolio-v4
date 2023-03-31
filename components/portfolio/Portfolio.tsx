import PortfolioItem from "./PortfolioItem";
import { getProjects } from "../../app/data";

export default async function Portfolio() {
  const projects = await getProjects();
  // renderPortfolio() {
  //     const { readyState, items } = this.props.portfolio;
  //
  //     if (readyState === 'WORK_FETCHING') {
  //         return (
  //             <div className="portfolio-loading">
  //                 <i className="fa fa-refresh fa-spin fa-5x fa-fw" />
  //                 <div className="caption">Work loading...</div>
  //             </div>
  //         );
  //     } else if (readyState === 'WORK_FETCHED') {
  //         return (
  //             <div>
  //                 {items
  //                     .sort((a, b) => {
  //                         if (a.sort > b.sort) return 1;
  //                         if (a.sort < b.sort) return -1;
  //                         return 0;
  //                     })
  //                     .map((item, index) => {
  //                         let color = index % 2 ? '#000' : '#353535';
  //                         return (
  //                             <PortfolioItem
  //                                 key={index}
  //                                 index={index}
  //                                 color={color}
  //                                 item={item}
  //                             />
  //                         );
  //                     })}
  //             </div>
  //         );
  //     } else {
  //         return 'nothing found.';
  //     }
  // }

  return (
    <section
      // className={this.props.animation() + "portfolio clearfix"}
      className={"portfolio clearfix"}
      id="work"
    >
      <div>
        {projects
          .sort((a, b) => +a.sort - +b.sort)
          .map((item, index) => {
            const color = index % 2 ? "#000" : "#353535";
            return (
              <PortfolioItem
                key={index}
                index={index}
                color={color}
                item={item}
              />
            );
          })}
      </div>
    </section>
  );
}