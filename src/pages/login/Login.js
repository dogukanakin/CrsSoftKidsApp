import React, { useContext, useState, useEffect } from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { auth, provider } from '../../firebase'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { AuthContext } from './../../context/AuthContext'

const LoginTry = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [inputType, setInputType] = useState('password')
  const navigate = useNavigate()

  const { dispatch } = useContext(AuthContext)

  useEffect(() => {
    // Retrieve stored email and password from localStorage
    const storedEmail = localStorage.getItem('rememberedEmail')
    const storedPassword = localStorage.getItem('rememberedPassword')

    if (storedEmail && storedPassword) {
      // If stored email and password exist, populate the inputs state and set rememberMe to true
      setInputs(prev => ({
        ...prev,
        email: storedEmail,
        password: storedPassword,
        rememberMe: true
      }))
    }
  }, [])

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleRememberMe = e => {
    setInputs(prev => ({ ...prev, rememberMe: e.target.checked }))
  }

  const handleLogin = async e => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })

    try {
      // Perform login with email and password
      await signInWithEmailAndPassword(auth, inputs.email, inputs.password)
      const user = auth.currentUser
      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
      navigate('/')
      if (inputs.rememberMe) {
        // Store email and password in localStorage if rememberMe is checked
        localStorage.setItem('rememberedEmail', inputs.email)
        localStorage.setItem('rememberedPassword', inputs.password)
      } else {
        // Remove stored email and password from localStorage if rememberMe is unchecked
        localStorage.removeItem('rememberedEmail')
        localStorage.removeItem('rememberedPassword')
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' })
      window.alert('Your user information is incorrect. Please try again.')
    }
  }

  const signInWithGoogle = () => {
    dispatch({ type: 'LOGIN_START' })

    signInWithPopup(auth, provider)
      .then(result => {
        console.log(result)
        const user = result.user
        dispatch({ type: 'LOGIN_SUCCESS', payload: user })
        navigate('/')
      })
      .catch(error => {
        dispatch({ type: 'LOGIN_FAILURE' })
      })
  }

  return (
    <body>
      <div className='login-container'>
        <div className='login-section'>
          <div className='logo-section'>
            <div className='logo-container'>
              <a href='#' className='logo'>
                <img
                  src='https://media.licdn.com/dms/image/D4D0BAQH7GOIcMFJG0w/company-logo_200_200/0/1681714294907?e=1694044800&v=beta&t=uPihArS-gNwWOa9ZFqrngl4qqD1flGnvl5OXYaO6nUM'
                  alt='Logo'
                />
              </a>
            </div>

            <div className='form-section'>
              <p className='welcome-text'>Welcome.</p>
              <form
                className='login-form'
                onSubmit={event => event.preventDefault()}
              >
                <div className='form-field'>
                  <label htmlFor='email' className='label-text'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Email'
                    value={inputs.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='form-field'>
                  <label htmlFor='password' className='label-text'>
                    Password
                  </label>
                  <input
                    type={inputType}
                    name='password'
                    id='password'
                    placeholder='Password'
                    value={inputs.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='rememberMe'>
                  <input
                    type='checkbox'
                    id='rememberMe'
                    name='rememberMe'
                    checked={inputs.rememberMe}
                    onChange={handleRememberMe}
                  />
                  <label htmlFor='rememberMeLabel'>Remember Me</label>
                </div>

                <button
                  onClick={handleLogin}
                  type='submit'
                  value='Log In'
                  className='login-button'
                >
                  Log In
                </button>

                <button
                  type='button'
                  value='Log In with Google'
                  className='login-button'
                  onClick={signInWithGoogle}
                >
                  Log In with Google
                </button>
              </form>

              <p className='register-text'>
                Don't have an account?{' '}
                <Link to='/register' className='register-link'>
                  Register
                </Link>
              </p>

              <p className='forgot-password-text'>
                Forgot your password?{' '}
                <Link to='/forgot-password' className='forgot-password-link'>
                  Reset Password
                </Link>
              </p>
            </div>
          </div>

          <div className='image-section'>
            <img
              className='background-image'
              src='https://e0.pxfuel.com/wallpapers/981/600/desktop-wallpaper-purple-and-blue-pattern-purple-blue-and-green.jpg'
              alt='Background'
            />
          </div>
        </div>
      </div>
    </body>
  )
}

export default LoginTry
