import ContactForm from '@/components/contactForm/contactForm';
import { getHomeBlocks } from '../../app/data';
import { findKeyWithValue } from '@/lib/utils';
import { CMSMarkup } from '@/components/common/CMSMarkup';
import React from 'react';
// import OpenChat from '../ReactHelpDesk/client/openChat';
// import { animation } from '../../libs/utils';
import styles from './footer.module.scss';
import clsx from 'clsx';
import { ASSETS_URL } from '@/lib/constants';
import { getImages } from '@/lib/services/fetchImages';
import { CustomCSSProperties } from '@/lib/types/global';

export async function Footer({ isInterior }: { isInterior?: boolean }) {
  const blocks = await getHomeBlocks();
  const [main, , fallback] = await getImages(
    `${ASSETS_URL}/ca68252a-2078-41ad-8801-0cef47444183/footer-tile.webp`,
  );
  const contact = findKeyWithValue(blocks, 'title', 'Contact');
  const aboutTheSite = findKeyWithValue(blocks, 'title', 'About the Site');

  return (
    <footer
      className={clsx(styles.footer, isInterior && styles.interior)}
      style={
        {
          backgroundImage: `url('/assets/${fallback}')`,
          '--background-image-webp': `url('/assets/${main}')`,
        } as CustomCSSProperties
      }
    >
      <div className={styles.footerBorder} />
      <div className={styles.footerWrap} id="contact-area">
        <div
          // className={`${animation(
          //         this.props.global.animateContact,
          //         this.props.global.animateOff
          //     )}'container-fluid'`
          // }
          className="container-fluid"
        >
          <div className={`${styles.contact} row`} id="contact">
            <div className="col-lg-4">
              <h4>{contact.title}</h4>
              {/*<p className="contact-method chat">*/}
              {/*  <i className="fa fa-comments" /> &nbsp;*/}
              {/*  /!*<OpenChat>*!/*/}
              {/*  <a href="#">Live Chat</a>*/}
              {/*  /!*</OpenChat>*!/*/}
              {/*</p>*/}
              {/*<p className="contact-method">*/}
              {/*  <i className="fa fa-envelope" /> &nbsp;*/}
              {/*  <a*/}
              {/*    href="mailto:customerservice@jasongallagher.org?Subject=Interested%20in%20your%20services"*/}
              {/*    target="_top"*/}
              {/*  >*/}
              {/*    Email*/}
              {/*  </a>*/}
              {/*</p>*/}
              <CMSMarkup html={contact.content} name="contact" />
              <h4 className="about-this-site">{aboutTheSite.title}</h4>
              <CMSMarkup html={aboutTheSite.content} name="aboutTheSite" />
              {/*<p className="about-this-site-text">*/}
              {/*  This site is 100% <span>HANDCRAFTED</span> with React, Redux,*/}
              {/*  Node, PostgreSQL, and <span>OF COURSE</span> Html and CSS. It is{" "}*/}
              {/*  <span>ISOMORPHIC</span>, or rather a single page app that is*/}
              {/*  first rendered on the server. This is really great for*/}
              {/*  performance, accessibility and SEO!*/}
              {/*</p>*/}
            </div>
            <div className="col-lg-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* istanbul ignore next */
// function mapStateToProps(state) {
//     return {
//         contactForm: state.contactForm,
//         global: state.global,
//     };
// }
// /* istanbul ignore next */
// function mapDispatchToProps(dispatch) {
//     return {
//         dispatch: dispatch,
//     };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Footer);
