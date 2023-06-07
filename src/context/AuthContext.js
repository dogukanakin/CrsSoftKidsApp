import { createContext, useEffect, useReducer } from 'react'
import AuthReducers from './AuthReducer'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'
import { useContext } from 'react'

// Initial state for the authentication context
const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  isLoading: false,
  error: false
}

// Function to send a password reset email
const forgotPassword = email => {
  return sendPasswordResetEmail(auth, email)
}

// Custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext)

// Create the AuthContext with the initial state
export const AuthContext = createContext(INITIAL_STATE)

// AuthContextProvider component to wrap the application and provide the AuthContext
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducers, INITIAL_STATE)

  // Store the currentUser in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.currentUser))
  }, [state.currentUser])

  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        isLoading: state.isLoading,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
