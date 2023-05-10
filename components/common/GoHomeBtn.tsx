'use client';

function GoHomeBtn() {
  return (
    <div>
      <button
        type="button"
        // temp fix for Link not working in not-found.tsx
        onClick={() => (window.location.href = '/#home')}
        className="button button-green button-smaller"
      >
        Go Home
      </button>
    </div>
  );
}

export default GoHomeBtn;
