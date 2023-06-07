import React from 'react'
import './welcomePage.scss'

const WelcomePage = () => {
  return (
    <div className='welcomePage'>
      <img
        src='https://media.licdn.com/dms/image/D4D0BAQH7GOIcMFJG0w/company-logo_200_200/0/1681714294907?e=1694044800&v=beta&t=uPihArS-gNwWOa9ZFqrngl4qqD1flGnvl5OXYaO6nUM'
        alt='About Us'
        className='aboutUsImg'
      />
      <div className='about'>
        <div className='text'>
          <h1>Welcome to Crs Kids</h1>
          <p>
            Crs Kids is a powerful web application designed to help you
            effectively manage your students and their grades. With Crs Kids,
            you have the ability to seamlessly add, edit, and delete student
            profiles, as well as manage their grades effortlessly. Our
            user-friendly interface allows you to view and organize the
            students' grades in a convenient table format, making it easy to
            track their progress.
          </p>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
