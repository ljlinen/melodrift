import { useContext } from 'react'
import { MainSongContext } from '../context/MainSongContext'

export default function useMainSongContext() {
    const context = useContext(MainSongContext)

    if(!context) throw Error('You must be inside MainSongProvider');
    
  return context
}
