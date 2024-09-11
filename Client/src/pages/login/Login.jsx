import React, { useState } from 'react'
import Header from '../../components/header/Header';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { storeContext } from '../../context/StoreContext';
import axios from 'axios';

export default function Login() {
  const {url, setToken} = useContext(storeContext);


  

  



  return (
    <>
    <Header/>
    <form className='login'>
      <h2>Login</h2>
      <input type="text" placeholder='Username...' onChange={e => setusername(e.target.value)}/>
      <input type="password" placeholder='Password...'  onChange={e=> setpassword(e.target.value)}/>
      <button>Login</button>
    </form>

    </>
  )
}
