import React, { useEffect, useState } from 'react'
import './Header.css'
import {Link} from 'react-router-dom'

export default function Header() {


  return (
    <div className='header-container'>
        <header>
          <Link to={'/'} className='logo'>The Blog Site</Link>
          <nav>

            <>
              <Link to='/create'>Create new Post</Link>
              <a>Logout</a>
            </>
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>

        </nav>
        </header>
    </div>
  )
}
