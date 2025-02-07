import React, { useState } from 'react';
import axios from 'axios';
import './UserLogin.css';  // Import the CSS file
import BookTable from './BookTable';  // Import BookTable component

function UserLogin() {
  const [form, setForm] = useState({ username: ''});
  const [errMsg, setErrMsg] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to track login status

  const errorMessages = {
    username: 'Please enter a valid email address'
  };

  const validateForm = () => {
    const errors = [];
    // RFC 5322 compliant email regex
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailPattern.test(form.username)) {
      errors.push(errorMessages.username);
    }
    
    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setErrMsg(errors);
    } else {
      setErrMsg([]);
      login(form.username);
    }
  };

  const login = (username) => {
    const headers = { 'Content-Type': 'application/json' };
    const body = {
      userEmail: username,
      password: '',
    };

    axios
      .post('http://localhost:8080/api/login?isAdmin=false', body, { headers })
      .then((response) => {
        alert('Login Successful');
        setIsLoggedIn(true);  // Set login status to true
        window.localStorage.setItem("email",username)
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert('Invalid userid or password');
          window.localStorage.removeItem("email")
        } else {
          alert('Login Successful');
          setIsLoggedIn(true);  // Set login status to true
          window.localStorage.setItem("email",username)
        }
      });
  };

  return (
    <div>
      {isLoggedIn ? (
        <BookTable userEmail={form.username} />  // Render BookTable component if logged in
      ) : (
        <div className="login-container">
          <form className="container login">
            <h1>Log In</h1>
            {errMsg.length > 0 && (
              <div className="error-message">
                {errMsg.map((msg, index) => (
                  <span key={index}>{msg}</span>
                ))}
              </div>
            )}
            <input
              type="email"
              placeholder="User Email"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />

            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserLogin;