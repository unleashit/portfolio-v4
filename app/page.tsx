import Header from '@/components/home/Header';
import WhoWhatWhere from '@/components/home/WhoWhatWhere';
import About from '@/components/home/About';
import Portfolio from '@/components/portfolio/Portfolio';
import { PrimaryHeader } from '@/components/primaryHeader/primaryHeader';
import Navigation from '@/components/navigation/navigation';
import getHomeData from './data';
import { Footer } from '@/components/footer/footer';
import MobileNavigation from '@/components/mobileNavigation/mobileNavigation';
import Loader from '@/components/common/loader';
import React, { Suspense } from 'react';

// import { animation, getEnvironment } from "@/lib/utils";

// import throttle from 'lodash/throttle';
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

  // const {
  //   hamburgerState,
  //   htmlClass,
  //   animateOff,
  //   animateAbout,
  //   animatePortfolio,
  // } = this.props.global;
  //

  return (
    <div id="home">
      <PrimaryHeader
        isHome
        // remoteId={this.props.liveChat.remoteId}
      >
        {/* @ts-expect-error Server Component */}
        <Navigation template="interior" ulClass="sticky-nav" />
      </PrimaryHeader>
      <MobileNavigation>
        {/* @ts-expect-error Server Component */}
        <Navigation template="hamburger" ulClass="responsive-nav" />
      </MobileNavigation>

      {/* @ts-expect-error Server Component */}
      <Header
      // openBurger={this.openBurger.bind(this)}
      />
      {/* @ts-expect-error Server Component */}
      <WhoWhatWhere />
      {/* @ts-expect-error Server Component */}
      <About
        animation={() => undefined}
        // animation={animation.bind(this, animateAbout, animateOff)}
      />
      <Suspense fallback={<Loader />}>
        {/* @ts-expect-error Server Component */}
        <Portfolio
        // animation={animation.bind(
        //   this,
        //   animatePortfolio,
        //   animateOff
        // )}
        />
      </Suspense>
      {/* @ts-expect-error Server Component */}
      <Footer />
    </div>
  );
}
