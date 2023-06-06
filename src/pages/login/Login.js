import React, { useContext, useState, useEffect } from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { auth, provider } from '../../firebase'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { AuthContext } from './../../context/AuthContext'

const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [toggleEye, setToggleEye] = useState(false)
  const [inputType, setInputType] = useState('password')
  const navigate = useNavigate()
  const [resetEmailSent, setResetEmailSent] = useState(false)

  const { dispatch } = useContext(AuthContext)

  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail')
    const storedPassword = localStorage.getItem('rememberedPassword')

    if (storedEmail && storedPassword) {
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
      await signInWithEmailAndPassword(auth, inputs.email, inputs.password)
      const user = auth.currentUser
      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
      navigate('/')
      if (inputs.rememberMe) {
        localStorage.setItem('rememberedEmail', inputs.email)
        localStorage.setItem('rememberedPassword', inputs.password)
      } else {
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
        // The signed-in user info.
        const user = result.user
        dispatch({ type: 'LOGIN_SUCCESS', payload: user })
        navigate('/')
      })
      .catch(error => {
        dispatch({ type: 'LOGIN_FAILURE' })
      })
  }

  const handleForgotPassword = async e => {
    e.preventDefault()

    try {
      await auth.sendPasswordResetEmail(inputs.email)
      setResetEmailSent(true)
    } catch (error) {
      console.log(error)
      // Handle error if password reset email failed to send
    }
  }

  return (
    <div className='login'>
      <form>
        <h2>Login</h2>
        <div className='formInput'>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            value={inputs.email}
            onChange={handleChange}
            required
          />
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
          <label htmlFor='rememberMe'>Remember Me</label>
        </div>

        <button onClick={handleLogin} type='submit'>
          Login
        </button>

        <div className='forgotPassword'>
          <Link to='/forgot-password'>Forgot Password?</Link>
        </div>

        <p className='haveacc'>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
