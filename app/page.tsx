import Header from '@/components/home/Header';
import WhoWhatWhere from '@/components/home/WhoWhatWhere';
import About from '@/components/home/About';
import Portfolio from '@/components/portfolio/Portfolio';
import { PrimaryHeader } from '@/components/primaryHeader/primaryHeader';
import Navigation from '@/components/navigation/navigation';
import getHomeData from './data';
import { Footer } from '@/components/footer/footer';
import { ASSETS_URL } from '@/lib/constants';
// import { animation, getEnvironment } from "@/lib/utils";

export default async function Home() {
  await getHomeData();

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

  return (
    <div>
      {/* HACK since NextJS metatdata api doesn't currently support <link /> */}
      <link
        rel="preload"
        fetchPriority="high"
        as="image"
        href={`${ASSETS_URL}/a9824768-3995-46a6-a3c8-5a5689778498/header-image.webp?format=webp`}
        type="image/webp"
      />
      <PrimaryHeader
        isHome
        // remoteId={this.props.liveChat.remoteId}
      >
        {/* @ts-expect-error Server Component */}
        <Navigation template="interior" ulClass="primaryNav" />
      </PrimaryHeader>
      {/* @ts-expect-error Server Component */}
      <Header />
      {/* @ts-expect-error Server Component */}
      <WhoWhatWhere />
      {/* @ts-expect-error Server Component */}
      <About
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
