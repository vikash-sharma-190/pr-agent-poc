// import React, { useState } from 'react';
// import Scanner from '../BarcodeReader';

// function Book({ onClose }) {
//   const [bookForm, setBookForm] = useState({
//     bookName: '',
//     author: '',
//     depositedBy: '',
//     userEmail: '',
//     userMobileNumber: '',
//     bookId: '',
//   });
  
//   const [showScanner, setShowScanner] = useState(false);
//   const [scanning, setScanning] = useState(false);
//   const [scannedCode, setScannedCode] = useState('');

//   const handleScan = () => {
//     setShowScanner(true);
//     setScanning(true);
//   };

//   const handleDetected = (result) => {
//     const scannedBarcode = result.codeResult.code;
//     console.log('Detected Barcode:', scannedBarcode);
//     setScannedCode(scannedBarcode);
//     setBookForm({ ...bookForm, bookId: scannedBarcode });
//     setScanning(false); // Stop scanning after detection
//     setShowScanner(false);
//   };

//   const handleSubmit = () => {
//     console.log('Form Submitted', bookForm);
//     onClose();
//   };

//   return (
//     <div>
//       <div className="book-container">
//         <form className="container book">
//           <h1>Green Form</h1>
//           <input
//             type="text"
//             placeholder="Green Name"
//             value={bookForm.bookName}
//             onChange={(e) => setBookForm({ ...bookForm, bookName: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Author"
//             value={bookForm.author}
//             onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Deposited By"
//             value={bookForm.depositedBy}
//             onChange={(e) => setBookForm({ ...bookForm, depositedBy: e.target.value })}
//           />
//           <input
//             type="email"
//             placeholder="User Email"
//             value={bookForm.userEmail}
//             onChange={(e) => setBookForm({ ...bookForm, userEmail: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="User Mobile Number"
//             value={bookForm.userMobileNumber}
//             onChange={(e) => setBookForm({ ...bookForm, userMobileNumber: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Scanned Book ID"
//             value={scannedCode || bookForm.bookId}
//             readOnly
//           />
//           <button type="button" style={{ background: 'rgb(163, 41, 41)' }} onClick={handleScan}>
//             Scan
//           </button>
//           <button type="button" onClick={handleSubmit}>
//             Submit
//           </button>
//           <button type="button" style={{ background: 'rgb(163, 41, 41)' }} onClick={onClose}>
//             Cancel
//           </button>
//         </form>
//       </div>

//       {/* Render the barcode scanner if it's activated */}
//       {scanning && (
//         <div id="scanner-container" style={{ position: 'absolute',top: '15%'}}>
//           <h2>Scan your barcode</h2>
//           <Scanner onDetected={handleDetected} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Book;
