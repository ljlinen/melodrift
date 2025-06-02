import React, { useState } from 'react'
import UploadPage from '../page/UploadPage'
import useFetchSongData from '../hooks/useFetchSongData';

export default function Test(id) {
    useFetchSongData(id)

  return (
    <div> 
          <input 
          className='default-button'
          type='button' value={'Add'} />
    </div>

  )
}
