import React from 'react'
import './footer.scss'

const Footer = () => {
  return (
    <section>
      <div className='footer'>
        <div class='footer__addr'>
          <h1 class='footer__logo'>Crs Soft</h1>

          <div className='footer__mail'>
            <a href='https://www.google.com/maps/place/Geli%C5%9Ftirme+B%C3%B6lgesi,+Crs+Soft,+B2+Blok+D:401,+34220+Esenler%2F%C4%B0stanbul/@41.0193915,28.8889775,15z/data=!4m5!3m4!1s0x14cabae216daf78b:0xadc277548a6b7657!8m2!3d41.0193915!4d28.8889775'>
              <address>
                Yıldız Teknik Üniversitesi Teknoloji Geliştirme Bölgesi, B2
                Blok, <br />
                No: 401, 34220 Esenler/ İSTANBUL
              </address>
            </a>
          </div>

          <div className='footer__mail'>
            <a href='mailto:info@crsoft.com'>info@crsoft.com</a>
          </div>
        </div>

        <div className='links1'>
          <h2>CRS</h2>
          <ul class='list list--menu'>
            <li>
              <a href='#'>Yolculuk</a>
            </li>
            <li>
              <a href='#'>CRSLog</a>
            </li>
            <li>
              <a href='#'>Topluluk</a>
            </li>
            <li>
              <a href='#'>İletişim</a>
            </li>
          </ul>
        </div>
        <div className='links2'>
          <h2>Markalar</h2>
          <ul class='list list--menu'>
            <li>
              <a href='#'>Home</a>
            </li>
            <li>
              <a href='#'>About</a>
            </li>
          </ul>
        </div>
      </div>

      <div class='legal'>
        <p>&copy; 2023 Copyright.</p>
      </div>
    </section>
  )
}

export default Footer
