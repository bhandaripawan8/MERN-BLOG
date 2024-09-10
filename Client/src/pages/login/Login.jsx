import React, { useState } from 'react'
import Header from '../../components/header/Header';
import { Navigate } from 'react-router-dom';

export default function Login() {

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [redirect, setredirect] = useState(false);

  async function handlelogin(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
  
    if (response.ok) {
      setredirect(true);
    } else {
      alert('Login failed');
    }
  }
  

  if(redirect) {
    return  <Navigate to={'/'}/>
  }

  return (
    <>
    <Header/>
    <form className='login' onSubmit={handlelogin}>
      <h2>Login</h2>
      <input type="text" placeholder='Username...' value={username} onChange={e => setusername(e.target.value)}/>
      <input type="password" placeholder='Password...' value={password} onChange={e => setpassword(e.target.value)}/>
      <button>Login</button>
    </form>
    </>
  )
}
