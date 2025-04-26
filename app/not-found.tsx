import { ASSETS_URL, META_DEFAULT_DESC } from '@/lib/constants';

import GoHomeBtn from '@/components/common/GoHomeBtn';
import { Metadata } from 'next';
import Img from '@/components/common/Img';

function NotFound() {
  return (
    <div className="center-container not-found">
      <div className="not-found-404">
        <Img
          src={`${ASSETS_URL}/874dd0cd-da15-415a-811d-adb9573e380d/not-found.webp?format=webp`}
          alt="Not Found"
        />
        <GoHomeBtn />
      </div>
    </div>
  );
}

export default NotFound;

export const metadata: Metadata = {
  title: '404 Not Found | Jason Gallagher',
  description: META_DEFAULT_DESC,
};
