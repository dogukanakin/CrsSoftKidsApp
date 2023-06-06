import React, { useContext, useState } from 'react'
import FormInput from '../../components/formInput/FormInput'
import { Link, useNavigate } from 'react-router-dom'
import './register.scss'
import { auth, provider } from '../../firebase'
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { AuthContext } from '../../context/AuthContext'

const Register = () => {
  const { dispatch } = useContext(AuthContext)
  const [inputValues, setInputValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: ''
  })
  const navigate = useNavigate()
  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'number',
      placeholder: 'Username',
      errorMessage: 'Username should be a number',
      pattern: '[0-9]{7}',
      required: true,
      maxLength: 8
    },
    {
      id: 2,
      name: 'email',
      type: 'Email',
      placeholder: 'Email',
      errorMessage: 'It should be a valid email address',
      required: true
    },
    {
      id: 3,
      name: 'password',
      type: 'text',
      placeholder: 'Password',
      errorMessage:
        'Password should be 8-20 characters and include at least 1 letter, 1 number, 1 special character',
      pattern: `(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,20}$`,
      required: true
    },
    {
      id: 4,
      name: 'confirmPassword',
      type: 'text',
      placeholder: 'Confirm Password',
      errorMessage: "Passwords don't match",
      pattern: inputValues.password,
      required: true
    }
  ]

  const handleChange = e => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value })
  }

  const handleRegister = async e => {
    e.preventDefault()

    try {
      await createUserWithEmailAndPassword(
        auth,
        inputValues.email,
        inputValues.password
      ).then(userCredential => {
        // Signed in
        const user = userCredential.user
        updateProfile(user, {
          displayName: inputValues.username
        })
        navigate('/login')
      })
    } catch (error) {}
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

  return (
    <div className='register'>
      <form>
        <h2>Register</h2>
        {inputs.map(input => (
          <FormInput
            key={input.id}
            {...input}
            value={inputValues[input.name]}
            onChange={handleChange}
          />
        ))}
        <button onClick={handleRegister} type='submit'>
          Register
        </button>

        <Link to='/'>
          {' '}
          {/* Specify the target URL for the link */}
          <button onClick={signInWithGoogle}>Sign up with Google</button>
        </Link>
        <div className='line'>
          <p className='haveacc'>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register
