import React, { useEffect, useState } from 'react'
import './Header.css'
import {Link} from 'react-router-dom'

export default function Header() {
  const [username, setusername] = useState('');
  useEffect(() =>{
    fetch('http://localhost:4000/profile',{
      credentials: 'include',
    }).then(response =>{
      response.json().then(userInfo=>{
        setusername(userInfo.username)
      })
    })
  },[])

  function logout(){
    fetch('http://localhost:4000/logout',{
      credentials: 'include',
      method: 'POST',
    });
    setusername(null);
  }

  return (
    <div className='header-container'>
        <header>
          <Link to={'/'} className='logo'>The Blog Site</Link>
          <nav>
          {username ? (
            <>
              <Link to='/create'>Create new Post</Link>
              <a onClick={logout}>Logout</a>
            </>
          ) : (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
          )}
        </nav>
        </header>
    </div>
  )
}
