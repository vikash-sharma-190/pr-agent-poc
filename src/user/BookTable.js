import React, { useEffect, useState } from "react";
import BookRow from "./BookRow";
import "./BookTable.css";


function BookTable(userEmail) {
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isReservedModalOpen, setIsReservedModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(15);
  const [bookData, setBooks] = useState([]);
  const [bookAllData, setAllBooks] = useState([]);
  const [email, setEmail] = useState(window.localStorage.getItem("email"));
  const [mobile, setMobile] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch data from the API when the component loads
const namePart = userEmail.userEmail.split("@")[0]; // Get the part before '@'
const [firstName, lastName] = namePart.split("."); // Split by '.'

const name = `${(firstName)}`;




const getRequestUrl = (type,book) => {
  const baseUrl = "http://localhost:8080/api/v1";
  switch (type) {
    case "UNRESERVE":
      return `${baseUrl}/userBooks/unreserved/${book.requestId}`;
    case "DEPOSITE":
      return `${baseUrl}/userBooks/submit/${book.requestId}`;
    case "PICKUP":
      return `${baseUrl}/userBooks/pickup/${book.requestId}`;
    case "RESERVE":
      return `${baseUrl}/requestBook`;
    default:
      return null;
  }
};

const pickupDeadline = new Date();
pickupDeadline.setDate(pickupDeadline.getDate() + 14);

const callback =(type,book)=>{
  handleSubmit(type,book);
}

const handleSubmit = async (e,book) => {
  setIsModalOpen2(true);
  let url = "";
  let reservationData={}
  if (e !== "RESERVE") {
    url = getRequestUrl(e,book); 
  } else {
    // e.preventDefault();
    url = getRequestUrl(e,book);
   reservationData = { name, email, mobile, bookId: book.bookId };
  }
  if (!url) return;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    });
    if (response.ok) {
      const responseBody = await response.text();
      // e !== "PICKUP" || e!=="DEPOSITE"  || e!=="UNRESERVE" ? openModal() : closeModal() ;
      // alert("Please use this link when you pick up the book from the office:\n" + responseBody);
      // closeReservedModal();
      if(e == "RESERVE"){
        setIsReservedModalOpen(false)
      }
      handleReservationSuccess();
      // onReservationSuccess();
    } else {
      alert("Failed to reserve. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
};



  const fetchUserBookData = () => {
    console.log("user name", userEmail);
    setIsLoading(true);
    fetch("http://localhost:8080/api/v1/userBooks/"+userEmail.userEmail)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        setIsLoading(false); 
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false); 
      });
  };

  const fetchAllBooksData = () => {
    setIsLoading(true);
    fetch("http://localhost:8080/api/v1/booksInfo/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        return response.json();
      })
      .then((data) => {
        setAllBooks(data);
        setIsLoading(false); 
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false); 
      });
  };


  const handleReservationSuccess = () => {
    fetchUserBookData();
    fetchAllBooksData();
  };

  useEffect(() => {
    fetchUserBookData();
    fetchAllBooksData();
  }, []);

  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <> 
    <h2>Hi {name}, {bookData.length > 0 ? "Here are the books you have already reserved or picked up" : "You Don't Have Any Green Books"}</h2>
    {bookData.length > 0 ? (
      <div className="table-container">
        <table className="book-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Deposited By</th>
              <th>Requested Date</th>
              <th>PickUpDue Date</th>
              <th>Issued Date</th>
              <th>Due Date</th>
              <th>Submitted Date</th>
              <th>Actions</th>
              <th>Actions</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
            {bookData.map((book, index) => (
              <BookRow key={index} book={book} isAllBooks={false} isReservedModalOpen={isReservedModalOpen} setIsReservedModalOpen={setIsReservedModalOpen}  callback={callback} />
            ))}
          </tbody>
        </table>
        
        <div className="pagination">
          <label>
            Page Size:
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={100}>100</option>
            </select>
          </label>
          <span>
            1 to {bookData.length} of {bookData.length}
          </span>
          <div className="page-controls">
            <button disabled>{"<"}</button>
            <button disabled>{">"}</button>
          </div>
        </div>
      </div>
    ) : (
      <p>Here are the books you have already reserved or picked up​.</p>)}

    <h2> Here are the book you can reserve. </h2>
    <div className="table-container">
      
        <table className="book-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Deposited By</th>
            <th>No. of Time Reserved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         {bookAllData.map((book, index) => (
            <BookRow key={index} book={book} isAllBooks={true}  isReservedModalOpen={isReservedModalOpen} setIsReservedModalOpen={setIsReservedModalOpen}  callback={callback} />
          ))}
        </tbody>
      </table>



        <div className="pagination">
          <label>
            Page Size:
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={100}>100</option>
            </select>
          </label>
          <span>
            1 to {bookAllData.length} of {bookAllData.length}
          </span>
          <div className="page-controls">
            <button disabled>{"<"}</button>
            <button disabled>{">"}</button>
          </div>
        </div>
      </div>


{isModalOpen2 && (
 <div className="modal-overlay">
 <div className="modal-content">
   <h2 className="modal-heading">Reservation Successful!</h2>
   <p className="modal-message">
     Thanks for reserving <strong>“The Green Future”</strong>.
   </p>
   <p className="modal-message">
     Please visit the <strong>Green Library</strong> at Gurugram Office (5th Floor) and pick up the book by <strong>{pickupDeadline.toDateString()}</strong>.
   </p>
   <p className="modal-message">
     If you are already there, just pick up the book and click the <strong>Pick Up</strong> button below.
   </p>
   <div className="modal-button-container">
     <button onClick={() => handleSubmit("PICKUP")} className="modal-button">
       Pickup
     </button>
     <button  onClick={() => setIsModalOpen2(false)}  className="modal-close-button">
       Done
     </button>
   </div>
 </div>
</div>
)}
      
      </>
  );
}

export default BookTable;
