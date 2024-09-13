import React, { useContext, useEffect, useState } from 'react'
import './css/audiouploader.css'
import cancel from '../../asset/img/icon/cancel.svg'
import { baseFetch, ShowInfoMessage } from '../..'
import { useNavigate } from 'react-router-dom'
import { ProfileContextAdmin } from './ArtistProfileAdmin'
import FormDataInputField from './FormDataInputField'
import Dialog from './Dialog'


export default function AudioUploader() {
  
  const navigate = useNavigate()
  const { username } = useContext(ProfileContextAdmin)

  const [pageActive, setPageActive] = useState(false)
  const [infoMessage, setInfoMessage] = useState()

  const formData = new FormData();


  useEffect(() => {

    setPageActive(true)
    
    return () => {
        setPageActive(false)
    }
  }, [])

  const setFormData = (key, value, minlength) => {
        
    if(value.length <= minlength) {
      return false
    } else {
      formData.set(key, value)
      return true
    }
}

const uploadSong = async() => {
  
  formData.set('cover', 'https://i.pinimg.com/736x/c0/9b/3f/c09b3fcbc73790a6dc94eead8739bd7d.jpg')
  formData.set('username', username)
  formData.forEach((value, key) => {
    console.log(key, value);
  });


  try{
      const uploadedObject = await baseFetch({
          route: '/upload/song',
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
      })
      
      if(uploadedObject['success']) {
        ShowInfoMessage('Song Uploaded Successfully!', uploadedObject['message'], setInfoMessage, true);
        navigate(0, { refresh: true });
      }
         
  } catch(error) {
    ShowInfoMessage('Failed Uploading', error, setInfoMessage, true);
    console.log(error); 
  }
}

  return (
    <form className='au-div-main-audio-uploader'
      onSubmit={(e) => {e.preventDefault()}}
      style={{opacity: pageActive ? 1 : 0}}
      // onSubmit={uploadSong}
    >
    { infoMessage ? (
        <Dialog
            heading={infoMessage.heading}
            message={infoMessage.message}
        />
    ) : null }
      <div className='au-div-heading-and-btn'>
        <div>
          <img className='icon cancel' alt='close' src={cancel} onClick={() => {navigate(-1)}} />
          <h3>Song Info</h3>
        </div>
        <input className='default-button' type='button' value='Upload' onClick={uploadSong} />
      </div>

      <div className='au-div-upload-inputs'>
        <FormDataInputField
          inputTitle='title'
          inputType='text'
          formData={formData}
          formDataKey='title'
          setFormDataFuncton={setFormData}
          minlength={0}
        />

        <FormDataInputField
          inputTitle='artists'
          inputType='text'
          formData={formData}
          formDataKey='artists'
          setFormDataFuncton={setFormData}
          minlength={0}
          title='name of artists on the song, use ft or x to eperate each name'
          required
        />

        <div className='div-inputwrap'>
          <p>genre</p>
          <select
              style={{
                width: '40%'
              }} 
              onChange={(e) => {
                      setFormData('genre', e.target.value, 0)
              }}>
            <option value='Hip-hop'>Hip-hop</option>
            <option value='Amapiano'>Amapiano</option>
            <option value='Private Piano'>Private Piano</option>
            <option value='House'>House</option>
            <option value='Deep House'>Deep House</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        
        <FormDataInputField
          inputTitle='year'
          inputType='number'
          formData={formData}
          formDataKey='year'
          setFormDataFuncton={setFormData}
          minlength={3}
          style={{width: '40%'}}
        />

        <FormDataInputField
          inputTitle='upload song'
          inputType='file'
          formData={formData}
          formDataKey='year'
          setFormDataFuncton={setFormData}
          minlength={0}
          style={{width: '40%'}}
          accept='audio/*'
          required
          onChange={(e) => {
            if(e.target.files)
              formData.append('file', e.target.files[0])
          }}
        />
      </div>
    </form>
  )
}
