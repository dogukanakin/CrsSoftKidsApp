import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import WelcomePage from './WelcomePage'
import './home.scss'

const Home = () => {
  return (
    <div className='home'>
      <>
        <Navbar />
        <div className='homeContainer'>
          <WelcomePage />
        </div>
        <Footer />
      </>
    </div>
  )
}

export default Home
