import React, { useState } from "react";
import { formatDate } from "../DateUtils";

function BookRow({ book, onReject, onGenLink }) {
  const [generatedLink, setGeneratedLink] = useState(null);

  const handleGenerateLink = async () => {
    const link = await onGenLink(book.requestId);
    if (link) {
      setGeneratedLink(link);
    }
  };

  return (
    <tr>
      <td>{book.bookName}</td>
      <td>{book.author}</td>
      <td>{book.depositedByUserName} <br></br> {book.depositedByUserEmail} </td>
      <td>{book.requestedByUserName} <br></br> {book.requestedByUserEmail} </td>
      <td>{formatDate(book.requestDate)}</td>
      <td>{formatDate(book.pickupDate)}</td>
      <td>{formatDate(book.issueDate)}</td>
      <td>{formatDate(book.dueDate)}</td>
      <td>{formatDate(book.submitedDate)}</td>
      <td>
        {/* <button className="approve-btn" onClick={handleGenerateLink}>Generate Link</button> */}
        <button className="reject-btn" onClick={() => onReject(book.requestId)}>Release</button>
        {generatedLink && (
          <div>
            <a href={generatedLink} target="_blank" rel="noopener noreferrer">Generated Link</a>
          </div>
        )}
      </td>
    </tr>
  );
}

export default BookRow;