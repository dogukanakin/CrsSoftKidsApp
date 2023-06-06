import React, { useContext, useState } from 'react'
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile,
  updateEmail
} from 'firebase/auth'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './update.scss'
import MenuLink from '../menuLink/MenuLink'

const Update = () => {
  const { dispatch, currentUser } = useContext(AuthContext)

  const [data, setData] = useState({
    username: '',
    newEmail: '',
    oldPassword: ''
  })

  const navigate = useNavigate()

  const handleChange = e => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleUpdate = async e => {
    e.preventDefault()

    const confirmed = window.confirm(
      'Are you sure you want to update your profile?'
    )
    if (!confirmed) {
      return
    }

    await updateProfile(currentUser, {
      displayName: data.username
    })

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      data.oldPassword
    )

    await reauthenticateWithCredential(currentUser, credential).then(
      async () => {
        // User re-authenticated.
        await updateEmail(currentUser, data.newEmail)
      }
    )

    navigate('/login')
  }

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?')
    if (confirmLogout) {
      dispatch({ type: 'LOGOUT' })
      navigate('/login')
    }
  }

  return (
    <div className='update'>
      <div className='updateWrapper'>
        <h3 className='updateTitle'>Edit Your Account</h3>
        <ul className='userInfoList'>
          <li>
            <span>Email Address: {currentUser.email}</span>
          </li>
          <li>
            <span>Username: {currentUser.displayName}</span>
          </li>

          {/* i want to see phone number too */}
          <li>
            <span>Phone Number: {currentUser.phoneNumber}</span>
          </li>
        </ul>

        <div className='logOut'>
          <button className='logOutButton' onClick={handleLogout}>
            Log Out
          </button>
        </div>
        <div className='updateContainer'>
          <form onSubmit={handleUpdate}>
            <div className='formItem'>
              <label>Username</label>
              <input
                className='formInput'
                type='text'
                name='username'
                placeholder={currentUser.displayName}
                onChange={handleChange}
              />
            </div>
            <div className='formItem'>
              <label>Email</label>
              <input
                className='formInput'
                type='email'
                name='newEmail'
                placeholder={currentUser.email}
                onChange={handleChange}
              />
            </div>
            <div className='formItem'>
              <label>Password</label>
              <input
                className='formInput'
                name='oldPassword'
                type='password'
                onChange={handleChange}
              />
            </div>
            <button type='submit' className='updateButton'>
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Update
