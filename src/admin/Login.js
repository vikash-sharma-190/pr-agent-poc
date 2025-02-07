import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';  // Import the CSS file
import BookTable from './BookTable';  // Import BookTable component

const errorMessages = {
  username: 'Username should not contain any special characters',
  password: 'Password must contain a minimum of 6 characters, at least 1 alphanumeric and 1 special character',
};

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errMsg, setErrMsg] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to track login status

  const validateForm = () => {
    const errors = [];
    const usernamePattern = /^[\w\s]+$/;
    const passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}/;

    if (!usernamePattern.test(form.username)) {
      errors.push(errorMessages.username);
    }

    if (!passwordPattern.test(form.password)) {
      errors.push(errorMessages.password);
    }

    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setErrMsg(errors);
    } else {
      setErrMsg([]);
      login(form.username, form.password);
    }
  };

  const login = (username, password) => {
    const headers = { 'Content-Type': 'application/json' };
    const body = {
      userEmail: 'vikash.vishwakarma@pepsico.com',
      password: 'kya',
    };

    axios
      .post('http://localhost:8080/api/login', body, { headers })
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
        <BookTable />  // Render BookTable component if logged in
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
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
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

export default Login;