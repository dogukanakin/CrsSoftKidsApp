import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import AboutUs from '../../components/aboutUs/AboutUs'
import './home.scss'

const Home = () => {
  return (
    <div className='home'>
      <>
        <Navbar />
        <div className='homeContainer'>
          <AboutUs />
        </div>
        <Footer />
      </>
    </div>
  )
}

export default Home
