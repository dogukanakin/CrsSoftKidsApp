import React from 'react'
import './welcomePage.scss'

const WelcomePage = () => {
  return (
    <div className='welcomePage'>
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

      <div className='squareContainer'>
        <div className='coursesSquareLeft'>
          <div className='courses'>
            <h1>Projects</h1>
            <p>
              Crs Kids streamlines course management with easy course addition,
              editing, deletion, and a user-friendly table view for efficient
              tracking.
            </p>
            <img
              src='https://www.educationalappstore.com/images/best-coding-apps-for-kids.jpg'
              alt='Manage Courses'
              className='coursesImg'
            />
            <button className='coursesButton'>Manage Project</button>
          </div>
        </div>

        <div className='projectsSquareRight'>
          <div className='projects'>
            <h1> Courses</h1>
            <p>
              Crs Kids allows you to add, edit, and delete courses. You can also
              view all of the courses in a convenient table format.
            </p>
            <img
              src='https://images01.nicepagecdn.com/page/20/52/website-builder-software-preview-205257.jpg'
              alt='Manage Courses'
              className='coursesImg'
            />
            <button className='coursesButton'>Manage Courses</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
