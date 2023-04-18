'use client';

// export default function Loader() {
//   return (
//     <>
//       <style jsx>{`
//         .wrapper {
//           display: flex;
//           min-height: 600px;
//           align-items: center;
//           justify-content: center;
//         }
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
//       <div className="wrapper">
//         <div className="loader"></div>
//       </div>
//     </>
//   );
// }

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import styles from './loading.module.scss';

export default function PLoader() {
  return (
    <div className={styles.loading}>
      <FontAwesomeIcon icon={faRotate} size="5x" spin color="#ddd" />
    </div>
  );
}
