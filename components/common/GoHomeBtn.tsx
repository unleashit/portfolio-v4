'use client';

import Link from 'next/link';

function GoHomeBtn() {
  return (
    <div>
      <Link href="/">
        <button type="button" className="button button-green button-smaller">
          Go Home
        </button>
      </Link>
    </div>
  );
}

export default GoHomeBtn;
