import React, { useState } from 'react'
import '../comp/css/uploadpage.css'
import FormDataInputField from '../comp/FormDataInputField'
import useFetchSongData from '../hooks/useFetchSongData';

export default function UploadPage(id) {

  useFetchSongData(id);
  return (
    <div className='uploadpage-div-main'>
      <div className='div-header'>
        <h1>Melodrift</h1>
        <p>Upload you Song To Share</p>
      </div>

      <div className='div-body'>
        <form>
          <h3>Upload Your Song</h3>
          <p>Upload you Song To Share</p>
          <div className='input-wrap formElementSlideIn'>
            <FormDataInputField 
              inputTitle={'Mp3 Audio File'}
              inputType={'file'}
              style={{maxWidth: 200, padding: 6, backgroundColor: '#fff'}}
              accepts={'audio/mp3'}
            />
          </div>
          <input type='button' className='default-button' value='Upload' />
        </form>
      </div>

      <footer>
      <div className='footer-loginsignup'>
          <div className='row'>
              <input type='button' className='default-button' value='Signup' />
              <p>to create a profile</p>
          </div>
          <p>or</p>
          <div className='row'>
              <input type='button' className='default-button' value='Login' />
              <p>if you have an account</p>
          </div>
      </div>
      </footer>
    </div>
  )
}
