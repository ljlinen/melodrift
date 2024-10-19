import React, { createContext, useReducer } from 'react'

export const LoginContext = createContext();

export const loginReducer = (state, action) => {

  switch (action.type) {
    case 'LOGIN':
      return {
        userLogin: action.payload,
        userGuest: state.userGuest,
      }
    case 'GUEST':
      return {
        userLogin: state.userLogin,
        userGuest: action.payload,
      }
    case 'LOGOUT':
      return {
        userLogin: null,
        userGuest: state.userLogin.username,
      }
    default:
      return state
  }
}

export const LoginContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(loginReducer, {
    userLogin: null,
  });

  return (
    <LoginContext.Provider value={{...state, dispatch}}>
      { children }
    </LoginContext.Provider>
  )
}
 