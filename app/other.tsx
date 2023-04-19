'use client';

import Loader from '@/components/common/loader';

const styles = {
  height: '100vh',
  color: '#333',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
} as const;

function MainLoader() {
  console.log('main loader...');
  return <Loader style={styles} />;
}

export default MainLoader;

// export default function Loader() {
//   return (
//     <>
//       <style jsx>{`
//         .loader {
//           border: 16px solid #f3f3f3;
//           border-top: 16px solid #3498db;
//           border-radius: 50%;
//           width: 120px;
//           height: 120px;
//           animation: spin 2s linear infinite;
//           margin: auto;
//         }
//
//         @keyframes spin {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//       <div className="loader"></div>
//     </>
//   );
// }
