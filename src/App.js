import { useContext } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import ForgotPassword from './pages/forgotPassword/ForgotPassword'

function App () {
  const { currentUser } = useContext(AuthContext)

  const AuthRoute = ({ children }) => {
    return currentUser ? children : <Navigate to='/login' />
  }

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route
            path='/'
            element={
              <AuthRoute>
                <Home />
              </AuthRoute>
            }
          />
          <Route path='*' element={<NotFoundPage />} />{' '}
        </Routes>
      </Router>
    </div>
  )
}

export default App
