import React, { createContext, useReducer } from 'react'

export const MainSongContext = createContext();

export const MainSongReducer = (state, action) => {
  console.log('mainsong index should keep increasing on payload', action.payload);
  
  switch (action.type) {
    case 'SET_SONG':
        return {
          mainsong: {...state.mainsong, ...action.payload }
        }
    case 'CLEAR_SONG':
      return {
        mainsong: null
      }
    default:
      return state
  }
}

export const MainSongContextProvider = ({ children }) => {

  const [state, mainsongdispatch] = useReducer(MainSongReducer, {
    mainsong: null,
  })
  return (
    <MainSongContext.Provider value={{...state, mainsongdispatch}}>
      { children }
    </MainSongContext.Provider>
  )
}
 