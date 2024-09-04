import React, { useContext, useEffect, useState } from 'react'
import './css/audiouploader.css'
import cancel from '../../asset/img/icon/cancel.svg'
import { baseUrl } from '../..'
import { useNavigate } from 'react-router-dom'
import { UsernameContext } from './ArtistProfile'

export default function AudioUploader() {
  

  const [pageActive, setPageActive] = useState(false)
  // const location = useLocation()
  const navigate = useNavigate()
  const formData = new FormData();
  const username = useContext(UsernameContext)
  

  const [uploadData, setUploadData] = useState({
    title: undefined,
    artists: undefined,
    cover: 'https://i.pinimg.com/736x/c0/9b/3f/c09b3fcbc73790a6dc94eead8739bd7d.jpg',
    genre: undefined,
    year: undefined,
    file: undefined,
  })

  useEffect(() => {
    
    setPageActive(true)

    return () => {
        setPageActive(false)
    }
  }, [])

  const setDataObject = (setobject, key, value, minlength) => {
        
    if(value.length <= minlength) {
        setobject(prev => ({...prev, [key]: false}))
    } else {
        setobject(prev => ({...prev, [key]: value}))
    }
}

const uploadSong = () => {
  
  formData.append('username', username)
  formData.append('file', uploadData.file);
  delete uploadData.file
  formData.append('fileInfo', JSON.stringify(uploadData))

  fetch(baseUrl + '/upload/song', {
      method: 'POST',
      body: formData,
  }).then((response) => {
    console.log(response.statusText);
      // setInfoMessage((prev) => ({...prev, infoCode: response.status}))
      return response.text()
  }).then((result) => {
    console.log(result);
    
      if(result === 'true') {
        console.log(result);
        
          // setLoginTabOpen(true)
          // setInfoMessage((prev) => ({...prev, infoMessage: "Song Uploaded Successfully"}))
      } else {
        console.log(result);
        
          // setLoginTabOpen(false)
          // setInfoMessage((prev) => ({...prev, infoMessage: result}))     
      }
  }).catch((error) => {
      console.log(error); 
  })
  navigate(0, {
    refresh: true,
    username: username
  })
}

  return (
    <form className='au-div-main-audio-uploader'
      style={{opacity: pageActive ? 1 : 0}}
      // onSubmit={uploadSong}
    >
      <img className='icon cancel' alt='close' src={cancel} onClick={() => {navigate(-1)}} />
      <div className='au-div-heading-and-btn'>
        <h3>Song Info</h3>
        <input className='save-button' type='button' value='Upload' onClick={uploadSong} />
      </div>

      <div className='au-div-upload-inputs'>
        <div className='div-inputwrap'>
                          <p>title</p>
                          <input type='text' 
                              style={{borderBottom: uploadData.title ? 'initial' : '1px solid red'}} 
                              onChange={(e) => {
                                      setDataObject(setUploadData, 'title', e.target.value, 3)
                              }} 
                          required/>
        </div>

        <div className='div-inputwrap'>
                          <p>artists</p>
                          <input type='text' 
                              style={{borderBottom: uploadData.artists ? 'initial' : '1px solid red'}} 
                              onChange={(e) => {
                                      setDataObject(setUploadData, 'artists', e.target.value, 3)
                              }} 
                              title='name of artists on the song, use ft or x to eperate each name'
                              required
                              />
        </div>

        <div className='div-inputwrap'>
                          <p>genre</p>
                          <select
                              style={{
                                borderBottom: uploadData.year ? 'initial' : '1px solid red',
                                width: '40%'
                              }} 
                              onChange={(e) => {
                                      setDataObject(setUploadData, 'genre', e.target.value, 3)
                              }} 
                          >
                            <option value='Hip-hop'>Hip-hop</option>
                            <option value='Amapiano'>Amapiano</option>
                            <option value='Private Piano'>Private Piano</option>
                            <option value='House'>House</option>
                            <option value='Deep House'>Deep House</option>
                            <option value='Other'>Other</option>
                          </select>
        </div>

        <div className='div-inputwrap'>
                          <p>year</p>
                          <input type='number'
                              pattern='^0\d{9}$' 
                              style={{
                                borderBottom: uploadData.year ? 'initial' : '1px solid red',
                                width: '40%'
                              }} 
                              onChange={(e) => {
                                      setDataObject(setUploadData, 'year', e.target.value, 3)
                              }} 
                          />
        </div>

        <div className='div-inputwrap'>
                          <p>upload song</p>
                          <input type='file'
                              accept='audio/mp3'
                              style={{
                                border: uploadData.file ? 'initial' : '1px solid red',
                              }} 
                              onChange={(e) => {
                                      setDataObject(setUploadData, 'file', e.target.files[0], 3)
                              }} 
                          required/>
        </div>
      </div>
    </form>
  )
}
