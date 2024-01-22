import React from 'react'
import Header from './Header'
import './Register.css'


export default function Register() {
  return (
    <>
    <Header/>
    <form className='register'>
      <h2>Register</h2>
      <input type="text" placeholder='Username...' />
      <input type="password" placeholder='Password...' />
      <button>Register</button>
    </form>
    </>
  )
}
