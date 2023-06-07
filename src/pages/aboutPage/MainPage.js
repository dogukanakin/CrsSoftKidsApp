import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import AboutUs from '../../components/aboutUs/AboutUs'

const MainPage = () => {
  return (
    <div className='home'>
      <Navbar />
      <AboutUs />
      <Footer />
    </div>
  )
}

export default MainPage
