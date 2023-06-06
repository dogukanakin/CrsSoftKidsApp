import './navbar.scss'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
  // console.log(currentUser);
  return (
    <div className='navbar'>
      <div className='navbarWrapper'>
        <div className='navbarLeft'>
          <span className='logo'>CrsSoftKids</span>
        </div>

        <div className='navbarRight'>
          <span className='navbarName'>{currentUser.displayName}</span>
          <img
            className='profileImg'
            // add an anonymous user image
            src={currentUser.photoURL || 'https://i.imgur.com/6VBx3io.png'}
          />
        </div>
      </div>
    </div>
  )
}

export default Navbar
