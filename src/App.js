import React, { useState } from 'react';
import './App.css';
import Login from './admin/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import BookTable from './user/BookTable';
import UserLogin from './user/UserLogin';

function App() {
  

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/dashboard" element={<UserLogin />} />
        </Routes>

     
      </div>
    </Router>
  );
}

export default App;