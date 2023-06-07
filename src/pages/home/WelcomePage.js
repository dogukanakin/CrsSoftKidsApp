import React from 'react'
import './aboutUs.scss'

const WelcomePage = () => {
  return (
    <div className='aboutUs'>
      <img
        src='https://media.licdn.com/dms/image/D4D0BAQH7GOIcMFJG0w/company-logo_200_200/0/1681714294907?e=1694044800&v=beta&t=uPihArS-gNwWOa9ZFqrngl4qqD1flGnvl5OXYaO6nUM'
        alt='About Us'
        className='aboutUsImg'
      />
      <div className='about'>
        <div className='text'>
          <h1>About Us</h1>
          <p>
            Our mission is to provide a platform for students to connect with
            each other and share their experiences. We want to help students
            find the right college for them and help them succeed in their
            academic careers.
          </p>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
