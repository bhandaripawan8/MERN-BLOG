import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Post from './Post.jsx';
import Header from './Header.jsx';
import './App.css';
import Login from './Login.jsx';
import Register from './Register.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
              <Post />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
