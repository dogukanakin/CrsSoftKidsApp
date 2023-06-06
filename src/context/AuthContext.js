import { createContext, useEffect, useReducer } from 'react'
import AuthReducers from './AuthReducer'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'
import { useContext } from 'react'

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  isLoading: false,
  error: false
}

const forgotPassword = email => {
  return sendPasswordResetEmail(auth, email)
}
export const useAuth = () => useContext(AuthContext)

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducers, INITIAL_STATE)

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
