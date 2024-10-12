import React, { useContext } from 'react'
import { ArtistMusicListContext } from '../context/ArtistMusicListContext'

export default function useArtistMusicListContext() {
    const context = useContext(ArtistMusicListContext)

    if(!context) throw Error('You must be inside ArtistMusicListProvider');
    
  return context
}
