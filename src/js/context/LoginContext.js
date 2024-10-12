import React, { createContext, useReducer } from 'react'

export const LoginContext = createContext();

export const loginReducer = (state, action) => {

  switch (action.type) {
    case 'LOGIN':
      return {
        userLogin: action.payload
      }
    case 'LOGOUT':
      console.log('logged out');
      return {
        userLogin: null
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
 