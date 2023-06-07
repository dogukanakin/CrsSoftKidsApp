import React from 'react'
import { Link } from 'react-router-dom'
import './notFoundPage.scss'

const NotFoundPage = () => {
  return (
    <div className='notFoundPage'>
      <div className='content'>
        <h1 className='title'>404</h1>
        <h2 className='subtitle'>Page Not Found</h2>
        <p className='description'>
          The page you are looking for does not exist.
        </p>
        <Link className='link' to='/'>
          Go Back to Home Page
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
