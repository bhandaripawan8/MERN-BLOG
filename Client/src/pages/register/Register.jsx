import React from 'react'
import Header from '../../components/header/Header';
import './Register.css'
import { useState } from 'react';


export default function Register() {

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

   async function register(e) {
    e.preventDefault();
    const response = 
      await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        // because this is json we need to send header
        headers: {'content-type':'application/json'}
      })
      if(response.ok) {
        alert('registration successful')
      } else{
          alert('registration failed');
      }
  }
   
  return (
    <>
    <Header/>
    <form className='register' onSubmit={register}>
      <h2>Register</h2>
      <input type="text" placeholder='Username...' value={username} onChange={e => setusername(e.target.value)}/>
      <input type="password" placeholder='Password...' value={password} onChange={e=> setpassword(e.target.value)}/>
      <button>Register</button>
    </form>
    </>
  )
}
