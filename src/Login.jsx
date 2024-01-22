import React from 'react'
import Header from './Header'

export default function Login() {
  return (
    <>
    <Header/>
    <form className='login'>
      <h2>Login</h2>
      <input type="text" placeholder='Username...' />
      <input type="password" placeholder='Password...' />
      <button>Login</button>
    </form>
    </>
  )
}
