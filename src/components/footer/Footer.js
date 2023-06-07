import React from 'react'
import './footer.scss'

const Footer = () => {
  return (
    <section>
      <div className='footer'>
        <div class='footer__addr'>
          <h1 class='footer__logo'>Crs Soft</h1>

          <address>
            Yıldız Teknik Üniversitesi Teknoloji Geliştirme Bölgesi, B2 Blok,
            No: 401, 34220 Esenler/ İSTANBUL
          </address>
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
