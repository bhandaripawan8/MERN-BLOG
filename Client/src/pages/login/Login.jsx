import React, { useState, useContext } from 'react';
import Header from '../../components/header/Header';
import { Navigate } from 'react-router-dom';
import { storeContext } from '../../context/StoreContext';
import axios from 'axios';

export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For redirecting after login

  const { url, setToken } = useContext(storeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${url}/auth/login`, data); // Send login request
      const token = response.data.token; // Assuming the token is in the response
      
      // Store token in localStorage and context
      localStorage.setItem('token', token);
      setToken(token);

      // Set logged-in state to true to trigger redirection
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // Redirect after successful login
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <form className="login" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="text"
          name="email"
          onChange={onChangeHandler}
          placeholder="Email..."
          value={data.email}
        />
        <input
          type="password"
          name="password"
          onChange={onChangeHandler}
          placeholder="Password..."
          value={data.password}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
