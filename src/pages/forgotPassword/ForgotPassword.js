import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import './forgotPassword.scss'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const auth = getAuth()
  const navigate = useNavigate()

  const handleResetPassword = e => {
    e.preventDefault()

    if (!email) {
      setErrorMessage('Please enter your email address')
      return
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        navigate('/login')
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
      })
  }

  return (
    <div className='login'>
      <form>
        <h2>Forgot Password</h2>
        <div className='formInput'>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          {errorMessage && <p className='error'>{errorMessage}</p>}

          <button
            type='submit'
            className='formLink'
            onClick={handleResetPassword}
          >
            Send Recovery Email
          </button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
