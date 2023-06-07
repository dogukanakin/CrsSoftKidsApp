const AuthReducers = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      // Set the state when login process starts
      return {
        currentUser: null,
        isLoading: true,
        error: false
      }
    case 'LOGIN_SUCCESS':
      // Set the state when login process is successful
      return {
        currentUser: action.payload,
        isLoading: false,
        error: false
      }
    case 'LOGIN_FAILURE':
      // Set the state when login process fails
      return {
        currentUser: null,
        isLoading: false,
        error: true
      }
    case 'LOGOUT':
      // Set the state when user logs out
      return {
        currentUser: null,
        isLoading: false,
        error: false
      }
    default:
      // Return the current state for unknown action types
      return state
  }
}

export default AuthReducers
