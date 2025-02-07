import React, { useState } from "react";
import { formatDate } from "../DateUtils";

function BookRow({ book, isAllBooks, isReservedModalOpen ,setIsReservedModalOpen, callback }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(window.localStorage.getItem("email"));
  const [mobile, setMobile] = useState("");
  const [actionType, setActionType] = useState(null);
  // const isPickupEnabled = book.requestDate !== null && book.pickupDate == null;
  // const isSubmitEnabled = book.pickupDate == null && book.submitedDate == null;


  // const openReservedModal = (type) => {
  //   setActionType(type);
  //   setIsReservedModalOpen(true);
  // };
  // const closeReservedModal = () => {
  //   setIsReservedModalOpen(false);
  //   setActionType(null);
  // };

  // const openModal = () => {
  //   setIsModalOpen2(true);
  // };
  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // console.log("ismodal",isModalOpen2)
  return (
    <>
      <tr>
        <td>{book.bookName}</td>
        <td>{book.author}</td>
        <td>
          {book.depositedByUserName} <br /> {book.depositedByUserEmail}
        </td>
        {isAllBooks && !book.isRequested && (
                <td>
                {book.requestedCount == null ? 0 : book.requestedCount}
              </td>
        )}
        {!isAllBooks && (
          <>
            <td>{formatDate(book.requestDate)}</td>
            <td>{formatDate(book.pickupDate)}</td>
            <td>{formatDate(book.issueDate)}</td>
            <td>{formatDate(book.dueDate)}</td>
            <td>{formatDate(book.submitedDate)}</td>
            <td>
              <button onClick={(e) => callback("PICKUP",book)}  className="reserve-btn">
                Pickup
              </button>
            </td>
            <td>
              <button onClick={(e) => callback("DEPOSITE",book)}   className="reserve-btn">
                Submit
              </button>
            </td>
            <td>
              <button onClick={(e) => callback("UNRESERVE",book)} className="reserve-btn">
                Release
              </button>
            </td>
          </>
        )}

        {isAllBooks && !book.isRequested && (
          <td>
            <button onClick={() => setIsReservedModalOpen(true)} className="reserve-btn">
              Reserve
            </button>
          </td>
        )}

      </tr>


      {isReservedModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Reserve Your Spot</h2>
            <form onSubmit={()=>callback("RESERVE",book)}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
            <button onClick={()=>setIsReservedModalOpen(false)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default BookRow;
