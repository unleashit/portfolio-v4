// export default async function Home() {
//
//   const project = await getProject("b141dd40-77ae-4b86-8284-58f95d26ae80");
//
//   return !project ? (
//     <div>loading...</div>
//   ) : (
//     <div>
//       <Head>
//         <title>Jason Gallagher</title>
//       </Head>
//       <h1>this is the home page</h1>
//       <pre><code>{project && JSON.stringify(project, null, 2)}</code></pre>
//     </div>
//   );
// }

// import StickyHeader from '@/components/stickyHeader/stickyHeader';
// import ResponsiveMenu from '@/components/navigation/responsiveMenu';
import Header from "@/components/home/Header";
import WhoWhatWhere from "@/components/home/WhoWhatWhere";
import About from "@/components/home/About";
// import Client from "./Client";
import logger from "@/lib/logger";
import Portfolio from "@/components/portfolio/Portfolio";
import { StickyHeader } from "@/components/stickyHeader/stickyHeader";
import Navigation from "@/components/navigation/navigation";
import { Footer } from "@/components/footer/footer";

// import { animation, getEnvironment } from "@/lib/utils";

// import throttle from 'lodash/throttle';
export default async function Home() {
  logger.info("HOME called");
  // await getHomeData();

  // static readyOnActions(dispatch) {
  //   return Promise.all([
  //     dispatch(portfolioActions.fetchPortfolioIfNeeded()),
  //     dispatch(portfolioActions.fetchPortfolioIfNeeded()),
  //   ]);
  // }
  //
  // constructor(props) {
  //   super(props);
  //   this.boundHandleScroll = throttle(this.handleScroll.bind(this), 150);
  // }
  //
  // componentDidMount() {
  //   Home.readyOnActions(this.props.dispatch).then(() => {
  //     if (window.pageYOffset > 10 || window.location.hash) {
  //       this.props.dispatch(globalActions.animateOff());
  //     }
  //     window.addEventListener('scroll', this.boundHandleScroll);
  //   });
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.boundHandleScroll);
  //   document.documentElement.className = '';
  //   // const { dispatch, global } = this.props;
  //   // if (global.headerState) dispatch(globalActions.setHeader(false));
  // }
  //
  // componentDidUpdate() {
  //   if (
  //     getEnvironment('client') &&
  //     !this.props.global.animateOff &&
  //     window.location.hash
  //   ) {
  //     setTimeout(() => {
  //       this.props.dispatch(globalActions.animateOff());
  //     }, 0);
  //   }
  // }
  //
  // // elem = css id of element to animate, action = action to dispatch
  // triggerAnimation([elem, action]) {
  //   const viewportHeight =
  //     Math.max(
  //       document.documentElement.clientHeight,
  //       window.innerHeight
  //     ) || 0;
  //
  //   if (
  //     // only trigger if not previously triggered
  //     !this.props.global[action] &&
  //     // trigger when element is < 90% of the viewport height
  //     document.getElementById(elem).getBoundingClientRect().top <
  //     viewportHeight * 0.9
  //   ) {
  //     this.props.dispatch(globalActions[action](true));
  //   }
  // }
  //
  // handleScroll() {
  //   [
  //     ['about', 'animateAbout'],
  //     ['work', 'animatePortfolio'],
  //     ['contact-area', 'animateContact'],
  //   ].forEach((animation) => this.triggerAnimation(animation));
  // }
  //
  // openBurger() {
  //   this.props.dispatch(globalActions.openHamburger());
  // }
  //
  // closeBurger() {
  //   this.props.dispatch(globalActions.closeHamburger());
  // }

  // const {
  //   hamburgerState,
  //   htmlClass,
  //   animateOff,
  //   animateAbout,
  //   animatePortfolio,
  // } = this.props.global;
  //
  // const htmlClassCheck = htmlClass ? { class: htmlClass } : {};

  return (
    <div id="home">
      <StickyHeader
      // remoteId={this.props.liveChat.remoteId}
      // openBurger={this.openBurger.bind(this)}
      >
        {/* @ts-expect-error Server Component */}
        <Navigation template="interior" ulClass="sticky-nav" />
      </StickyHeader>
      {/*<ResponsiveMenu*/}
      {/*  closeBurger={this.closeBurger.bind(this)}*/}
      {/*  menuVisible={hamburgerState}*/}
      {/*/>*/}

      {/* @ts-expect-error Server Component */}
      <Header
      // openBurger={this.openBurger.bind(this)}
      />
      {/*<Client />*/}
      {/* @ts-expect-error Server Component */}
      <WhoWhatWhere />
      {/* @ts-expect-error Server Component */}
      <About
        animation={() => undefined}
        // animation={animation.bind(this, animateAbout, animateOff)}
      />
      {/* @ts-expect-error Server Component */}
      <Portfolio
      // animation={animation.bind(
      //   this,
      //   animatePortfolio,
      //   animateOff
      // )}
      />
      {/* @ts-expect-error Server Component */}
      <Footer />
    </div>
  );
}

// function mapStateToProps(state) {
//   return {
//     portfolio: state.portfolio,
//     global: state.global,
//     liveChat: state.liveChat,
//   };
// }
