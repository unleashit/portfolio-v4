import { ASSETS_URL } from '@/lib/constants';

import GoHomeBtn from '@/components/common/GoHomeBtn';

function NotFound() {
  return (
    <div className="center-container not-found">
      <div className="not-found-404">
        <img
          src={`${ASSETS_URL}/874dd0cd-da15-415a-811d-adb9573e380d/not-found.webp?format=webp`}
          alt="Not Found"
        />
        <GoHomeBtn />
      </div>
    </div>
  );
}

export default NotFound;

// <Helmet
//   title="404 Not Found"
//   htmlAttributes={{ class: 'not-found-page' }}
// />
