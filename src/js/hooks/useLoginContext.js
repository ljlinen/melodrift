import React, { useContext } from 'react'
import { LoginContext } from '../context/LoginContext'

export default function useLoginContext() {
    const context = useContext(LoginContext)

    if(!context) throw Error('You must be inside LoginContextProvider');
    
  return context
}
