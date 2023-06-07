import './navbar.scss'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { currentUser, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = () => {
    // Confirm logout with a confirmation dialog
    const confirmLogout = window.confirm('Are you sure you want to log out?')
    if (confirmLogout) {
      // Dispatch the logout action and navigate to the login page
      dispatch({ type: 'LOGOUT' })
      navigate('/login')
    }
  }
  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <a href='https://www.crssoft.com/' className='navbar__logo'>
          <img
            src='https://media.licdn.com/dms/image/D4D0BAQH7GOIcMFJG0w/company-logo_200_200/0/1681714294907?e=1694044800&v=beta&t=uPihArS-gNwWOa9ZFqrngl4qqD1flGnvl5OXYaO6nUM'
            className='navbar__logo-img'
            alt='Crs Logo'
          />
          <span className='navbar__logo-text'>Crs Soft</span>
        </a>
      </div>

      <div className='items-list'>
        <div className='items-list__container'>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/about-us'>About</a>
          </li>

          <li>
            <a href='/table'>Contact</a>
          </li>
        </div>
      </div>
      <div className='logOut'>
        <button className='logOutButton' onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <div className='mobilebButtonn'>
        <div className='mobileButton'>
          <button
            className='mobileButton'
            onClick={() => setShowMenu(!showMenu)}
          >
            {' '}
            Menu
            <i className='fas fa-bars'></i>
          </button>
          {showMenu && (
            <div className='mobileMenu'>
              <ul>
                <li>
                  <a href='/'>Home</a>
                </li>
                <li>
                  <a href='/about-us'>About</a>
                </li>
                <li>
                  <a href='/table'>Contact</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className='search'>
        <input type='text' placeholder='Search...' />
      </div>
    </nav>
  )
}

export default Navbar
