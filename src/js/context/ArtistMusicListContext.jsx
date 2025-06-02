import React, { createContext, useReducer } from 'react'

export const ArtistMusicListContext = createContext();

export const ArtistMusicListReducer = (state, action) => {

  switch (action.type) {
    case 'SET_PINNED_SONG':
      return {
        pinnedsong: action.payload,
        artistmusiclist: state.artistmusiclist
      }
    case 'CLEAR_PINNED_SONG':
        return {
          pinnedsong: null,
          artistmusiclist: state.artistmusiclist
        }
    case 'SET_LIST':
        return {
          pinnedsong: state.pinnedsong,
          artistmusiclist: action.payload
        }
    case 'CLEAR_LIST':
      return {
        pinnedsong: state.pinnedsong,
        artistmusiclist: []
      }
    case 'ADD_SONG':
        return {
        pinnedsong: state.pinnedsong,
        artistmusiclist: [...state.artistmusiclist, action.payload]
        }
    case 'REMOVE_SONG':
      return {
        pinnedsong: state.pinnedsong,
        artistmusiclist: state.artistmusiclist.filter((element) => element['id'] !== action.payload.id)
      }
    case 'UPDATE_SONG':
      state.artistmusiclist.forEach((element, i) => {
        if(element.id === action.payload.id) state.artistmusiclist.splice(i, 1, {...element,  'key': [element.key] + 1})
      });
      return {
        pinnedsong: state.pinnedsong,
        artistmusiclist: state.artistmusiclist
      }
    case 'CLEAR_CONTEXT':
      return {
        pinnedsong: null,
        artistmusiclist: []
      }
    default:
      return state
  }
  
}

export const ArtistMusicListContextProvider = ({ children }) => {

  const [state, musiclistdispatch] = useReducer(ArtistMusicListReducer, {
    pinnedsong: null,
    artistmusiclist: [],
  })
  
  return (
    <ArtistMusicListContext.Provider value={{...state, musiclistdispatch}}>
      { children }
    </ArtistMusicListContext.Provider>
  )
}
 