'use client';

import Link from 'next/link';

function GoHomeBtn() {
  return (
    <Link
      href="/"
      type="button"
      // onClick={() => router.push('/')}
      className="button button-green button-smaller"
    >
      Go Home
    </Link>
  );
}

export default GoHomeBtn;
