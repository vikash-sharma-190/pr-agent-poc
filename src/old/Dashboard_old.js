// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Scanner from '../BarcodeReader';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [showScanner, setShowScanner] = useState(false);
//   const [showDashBoard, setShowDashBoard] = useState(true);
//   const [showComponent, setShowComponent] = useState(false);
//   const [value, setValue] = useState('');
//   const [isError, setIsError] = useState(false);
//   const [books, setBooks] = useState([]);
//   const [bookForm, setBookForm] = useState({
//     bookName: '',
//     author: '',
//     userName: '',
//     userEmail: '',
//     mobileNumber: '',
//     bookId: ''
//   });

//   // Equivalent to ngOnInit in Angular
//   useEffect(() => {
//     console.log('on init');
//     getAllBooks();
//   }, []);

//   const getAllBooks = () => {
//     axios
//       .post('http://localhost:8080/api/getAllBooksInfo', {}, {
//         headers: { 'Content-Type': 'application/json' }
//       })
//       .then((response) => {
//         console.log(response.data);
//         setBooks(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const revokeBook = (id) => {
//     setShowDashBoard(false);
//     setShowScanner(true);
//   };

//   const issueBook = (id) => {
//     setShowDashBoard(false);
//     setShowScanner(true);
//   };

//   const qrResponse = () => {
//     console.info('qrResponse ' + value);
//     const book = books.find((book) => book.bookId === value);
//     if (book) {
//       book.isIssued = true;
//       console.log(`Book with ID ${book.bookId} has been issued.`);
//     } else {
//       console.log(`Book with ID ${value} not found.`);
//     }
//     setShowDashBoard(true);
//     setShowScanner(false);
//   };

//   const handleScanError = (error) => {
//     console.error(error);
//     setIsError(true);
//   };

//   const addNewBook = () => {
//     setShowComponent(!showComponent);
//   };

//   const onScan = () => {
//     console.log('Scan button clicked', bookForm);
//     setShowScanner(true);
//     setShowDashBoard(false);
//     setBookForm((prevForm) => ({ ...prevForm, bookId: value }));
//   };

//   const onSubmit = () => {
//     console.log('submit button clicked', bookForm);
//     setShowScanner(false);
//     setBookForm((prevForm) => ({ ...prevForm, bookId: value }));

//     axios
//       .post('http://localhost:8080/api/saveBook', bookForm, {
//         headers: { 'Content-Type': 'application/json' }
//       })
//       .then((response) => {
//         console.log(response.data);
//         getAllBooks();
//       })
//       .catch((error) => {
//         console.log(error);
//         getAllBooks();
//       });
//     setShowComponent(false);
//   };

//   const handleSubmit = () => {
//     console.log('submit button clicked', books);
//     console.log('value scanner', value);
  
//     setShowScanner(false); // Hides the scanner
  
//     axios
//       .post(`http://localhost:8080/api/updateFlag?bookId=${value}`, {}, {
//         headers: { 'Content-Type': 'application/json' }
//       })
//       .then((response) => {
//         console.log('API response:', response.data);
//         getAllBooks(); // Refresh the list of books after the API call
//       })
//       .catch((error) => {
//         console.log('Error while updating flag:', error);
//         getAllBooks(); // Optionally refresh even on error
//       });
  
//     setShowComponent(false); // Hides the component after submission
//     setShowDashBoard(true);
//     setValue('');
//   };
  


//   const close = () => {
//     setShowComponent(false);
//     setShowScanner(false);
//     setShowDashBoard(true);
//   };

//   // Handling detected value from Scanner
//   const handleDetected = (result) => {
//     const scannedValue = result.codeResult.code;
//     console.log(`Scanned value: ${scannedValue}`);
//     setValue(scannedValue); // Set the scanned value

//     // Perform further logic such as calling API to update the flag
//     qrResponse();
//   };

//   return (
//     <div>
//       {showDashBoard && (
//         <div id="dashboard">
//           <div className="dashboard-header">
//             <h2 style={{ color: 'white' }}>Green Park Dashboard</h2>
//             <button onClick={addNewBook} className="add-book-button">
//               Add New Green
//             </button>
//           </div>
//           <table className="book-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Author</th>
//                 <th>User Name</th>
//                 <th>Issued Date</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody id="bookTableBody">
//               {books.map((book) => (
//                 <tr key={book.bookId}>
//                   <td>{book.bookId}</td>
//                   <td>{book.bookName}</td>
//                   <td>{book.author}</td>
//                   <td>{book.userName}</td>
//                   <td>{book.issuedDate}</td>
//                   <td>
//                     {book.isIssued ? (
//                       <button onClick={() => revokeBook(book.bookId)} className="action-button revoke-button">
//                         Scan
//                       </button>
//                     ) : (
//                       <button onClick={() => issueBook(book.bookId)} className="action-button issue-button">
//                         Scan
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {showScanner && (
//         <div id="welcomeMessage" className="hidden">
//           <div className="barcode-scanner-container">
//                 <h1>Barcode Scanner - detected barcode: <small style={{ color: 'blue' }}>{value}</small>
//                 <div>
//              <input
//             type="text"
//             placeholder="Enter code .."
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//         />
//         <button onClick={handleSubmit}>Submit</button>
//             </div>
//         </h1>
//             <p id="barcodeError">{isError && 'Barcode scan is not available.'}</p>
//             <Scanner onDetected={handleDetected} />
//           </div>
//         </div>
//       )}

//       {showComponent && (
//         <div className="book-container">
//           <form className="container book">
//             <h1>Green Form</h1>
//             <input
//               type="text"
//               placeholder="Green Name"
//               value={bookForm.bookName}
//               onChange={(e) => setBookForm({ ...bookForm, bookName: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Author"
//               value={bookForm.author}
//               onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Deposited By"
//               value={bookForm.userName}
//               onChange={(e) => setBookForm({ ...bookForm, userName: e.target.value })}
//             />
//             <input
//               type="email"
//               placeholder="User Email"
//               value={bookForm.userEmail}
//               onChange={(e) => setBookForm({ ...bookForm, userEmail: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="User Mobile Number"
//               value={bookForm.mobileNumber}
//               onChange={(e) => setBookForm({ ...bookForm, mobileNumber: e.target.value })}
//             />
//             <button
//               type="button"
//               style={{ background: 'rgb(163, 41, 41)' }}
//               onClick={onScan}
//             >
//               Scan
//             </button>
//             <button type="button" onClick={onSubmit}>
//               Submit
//             </button>
//             <button type="button" style={{ background: 'rgb(163, 41, 41)' }} onClick={close}>
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
