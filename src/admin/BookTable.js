import React, { useEffect, useState } from "react";
import BookRow from "./BookRow";

function BookTable() {
  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const openModal2 = () => setIsModalOpen2(true);
  const closeModal2 = () => setIsModalOpen2(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bookData = {
      bookName: formData.get('name'),
      author: formData.get('author'),
      depositedByUserName: formData.get('depositByUserName'),
      depositedByUserEmail: formData.get('depositByUserEmail'),
      mobileNumber: formData.get('mobileNumber'),
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/addNewBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        alert("Book added successfully!");
        closeModal();
        window.location.reload(); 
      } else {
        alert("Failed to add book. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/getAllBooksInfo");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBookData(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/getLeaderboard");
      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard");
      }
      const data = await response.json();
      setLeaderboardData(data);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenLink = async (requestId) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/generateLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ requestId }),
      });
  
      if (response.ok) {
        const responseBody = await response.text(); // Read response body as text
        return responseBody; // Return the generated link
      } else {
        alert("Failed to generate link. Please try again.");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
      return null;
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/cancelRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ requestId }),
      });

      if (response.ok) {
        alert("Request cancelled successfully!");
        fetchData();  // Re-fetch book data
      } else {
        alert("Failed to cancel request. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleLeaderboardClick = () => {
    fetchLeaderboardData();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
     <header className="navbar">
          <button className="leaderboard-btn" onClick={openModal2}>Add New Book</button>
          <button className="leaderboard-btn" onClick={handleLeaderboardClick}>Leaderboard</button>

      </header>
      <table className="book-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Deposited By</th>
            <th>Requested By</th>
            <th>Requested Date</th>
            <th>Due Date For Pick Up</th>
            <th>Issued Date</th>
            <th>Due Date</th>
            <th>Submited Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookData.map((book, index) => (
            <BookRow key={index} book={book} onReject={handleReject} onGenLink={handleGenLink} />
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Leaderboard</h2>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user, index) => (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


{isModalOpen2 && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Add New Book</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Book Name</label>
                  <input type="text" name="name" required />
                </div>
                <div className="form-group">
                  <label>Author</label>
                  <input type="text" name="author" required />
                </div>
                <div className="form-group">
                  <label>Deposited By (Name)</label>
                  <input type="text" name="depositByUserName" required />
                </div>
                <div className="form-group">
                  <label>Deposited By (Email)</label>
                  <input type="email" name="depositByUserEmail" required />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="tel" name="mobileNumber" required />
                </div>
                <button type="submit" className="submit-btn">Submit</button>
                <button type="button" className="close-btn" onClick={closeModal2}>Close</button>
              </form>
            </div>
          </div>
        )}


    </div>
  );
}

export default BookTable;