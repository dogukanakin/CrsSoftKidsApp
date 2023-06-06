import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='notFoundPage'>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Link className='link' to='/'>
        Go Back Home Page
      </Link>
    </div>
  )
}

export default NotFoundPage
