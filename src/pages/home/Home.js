import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Update from '../../components/update/Update'
import './home.scss'

const Home = () => {
  return (
    <div className='home'>
      <>
        <Navbar />
        <div className='homeContainer'>
          <Update />
        </div>
      </>
    </div>
  )
}

export default Home
