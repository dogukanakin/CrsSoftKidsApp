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
        console.log(errorCode, errorMessage)
      })
  }

  return (
    <div className='resetPassword'>
      <div className='logo-container'>
        <a href='#' className='logo'>
          <img
            src='https://media.licdn.com/dms/image/D4D0BAQH7GOIcMFJG0w/company-logo_200_200/0/1681714294907?e=1694044800&v=beta&t=uPihArS-gNwWOa9ZFqrngl4qqD1flGnvl5OXYaO6nUM'
            alt='Logo'
          />
        </a>
      </div>
      <form>
        <h2>Forgot Password</h2>
        <div className='resetInputs'>
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
            className='resetPasswordButton'
            onClick={handleResetPassword}
          >
            Send Recovery Email
          </button>
          <p className='formLink'>
            <a href='/login'>Back to Login</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
