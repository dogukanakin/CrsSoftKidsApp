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
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'It should be a valid email address',
      required: true
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'Password should be 8-20 characters and include at least 1 letter, 1 number, 1 special character',
      pattern: `(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,20}$`,
      required: true
    },
    {
      id: 4,
      name: 'Confirm Password',
      type: 'password',
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

    if (
      inputValues.email === '' ||
      inputValues.password === '' ||
      inputValues.username === ''
    ) {
      window.alert('Please fill all the fields')
    } else {
      // Handle registration logic here if needed
    }

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
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    }
  }

  return (
    <body>
      <div className='register-container'>
        <div className='register-section'>
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
                className='register-form'
                onSubmit={event => event.preventDefault()}
              >
                <div className='form-field'>
                  {/* Render input fields */}
                  {inputs.map(input => (
                    <FormInput
                      key={input.id}
                      {...input}
                      value={inputValues[input.name]}
                      onChange={handleChange}
                    />
                  ))}
                  <button onClick={handleRegister} type='login-button'>
                    Register
                  </button>
                  <p>
                    Go back to{' '}
                    <Link to='/login' className='register-link'>
                      Login Page
                    </Link>
                  </p>
                </div>
              </form>
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

export default Register
