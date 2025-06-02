import React, { useEffect, useState } from 'react'
import '../../css/component/audiouploader.css'
import { baseFetch, ShowInfoMessage } from '../../main'
import { useLocation, useNavigate } from 'react-router-dom'
import FormDataInputField from './FormDataInputField'
import Dialog from './Dialog'
import useLoginContext from '../hooks/useLoginContext'
import useArtistMusicListContext from '../hooks/useArtistMusicListContext'
import usePageActive from '../hooks/usePageActive'
import Loader from './Loader'
import IconClose from "../../asset/icon/close.svg";



export default function SongUpdateInfo() {

  const pageActive = usePageActive("/profile/:username/updatesonginfo")
  const { userLogin } = useLoginContext()

  const location = useLocation()
  const navigate = useNavigate()
  // eslint-disable-next-line
  const { musiclistdispatch, artistmusiclist } = useArtistMusicListContext()

  const [infoMessage, setInfoMessage] = useState()
  const [songcover, setSongcover] = useState()
  const [formData, setformData] = useState({});
  const [uploading, setUploading] = useState()

  const { SongData, id } = location.state


  // UseEffect Section

  useEffect(() => {
    id && setFormData('songId', id, 0);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (!userLogin || !userLogin["username"]) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [userLogin]);

  useEffect(() => {
    console.log('formdata');
    Object.entries(formData).forEach((item) => console.log(item[0], item[1]))
    // eslint-disable-next-line
  }, [formData]);


  // Component Specific Functions

  const setFormData = (key, value, minlength) => {
    console.log('setting, key val as: ', key, value);
    if (value.length <= minlength) {
      delete formData[key]
      return false
    } else {
      setformData((prev) => ({ ...prev, [key]: value }))
      return true
    }
  }

  const updateSongInfo = async () => {
    if (!id) return

    const finalFormData = new FormData()

    for (let key in formData) {
      console.log(key, formData[key]);
      finalFormData.set(key, formData[key]);
    };
    // return

    try {
      setUploading(true)
      const uploadedObject = await baseFetch({
        route: '/song/updatesonginfo',
        method: 'POST',
        body: finalFormData,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })

      if (uploadedObject['success']) {
        ShowInfoMessage('Song Updated Successfully!', uploadedObject['message'], setInfoMessage, true);
        musiclistdispatch({ type: 'UPDATE_SONG', payload: { id } })
        setTimeout(() => {
          navigate('/profile/:username', { replace: true });
        }, 2000)
      }

    } catch (error) {
      setUploading(false)
      ShowInfoMessage('Failed Updating Song', error, setInfoMessage, true);
      console.log(error);
    }
  }


  return (
    SongData && <form className='au-div-main-audio-uploader'
      onSubmit={(e) => { e.preventDefault() }}
      style={{ opacity: pageActive ? 1 : 0, paddingBottom: 100 }}
    // onSubmit={uploadSong}
    >
      {infoMessage ? (
        <Dialog
          heading={infoMessage.heading}
          message={infoMessage.message}
        />
      ) : null}

      <div className='au-form-head'>
        {
          !uploading ?
            <div className="au-div-heading-and-btn">
              <h3>Update Song Info</h3>
              <IconClose className='icon' onClick={() => navigate(-1)} />
            </div>
            :
            <div className="au-div-heading-and-btn">
              <Loader load={uploading} style={{ width: '30%' }} />
              <h3>Uploading...</h3>
            </div>
        }

        {
          !uploading ?
            <>
              <h5>Only song info and cover photo can be updated</h5>
              <p>cos why would a song be updated complelety? are you trying to re-upload or something?<br></br>
                we donth du dath hear</p>
            </>
            :
            <>
              <h5>Hold on while i update this heat</h5>
            </>
        }
      </div>

      {
        !uploading ?
          <div className="au-div-upload-inputs">
            <FormDataInputField
              inputTitle="title"
              inputType="text"
              formData={formData}
              formDataKey="title"
              setFormDataFuncton={setFormData}
              minlength={0}
              placeholder={SongData.title}
              required
            />

            <FormDataInputField
              inputTitle="artists"
              inputType="text"
              formData={formData}
              formDataKey="artists"
              setFormDataFuncton={setFormData}
              minlength={0}
              title="name of artists on the song, use ft or x to eperate each name"
              placeholder={SongData.artists}
            />

            <div className="div-inputwrap">
              <p>genre</p>
              <select
                onChange={(e) => {
                  setFormData("genre", e.target.value, 0);
                }}
                defaultChecked={false}
                style={{ color: "rgba(var(--clr-background), 1)" }}
                required
                defaultValue={SongData.genre}
              >

                {/* 
                Database Functinality only accepts theese genres. 
                Modification to these should also be made in the database;
            */}
                <option value="Hip-hop">Hip-hop</option>
                <option value="Amapiano">Amapiano</option>
                <option value="Private Piano">Private Piano</option>
                <option value="House">House</option>
                <option value="Deep House">Deep House</option>
                <option value="Deep House">Soul</option>
                <option value="Deep House">Pop</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="au-form-head" style={{ marginLeft: -50 }}>
              <h5>upload new cover</h5>
              <p>you can upload without cover.</p>
            </div>

            <div className="cover-input-main">
              <div className="cover-input"
                style={{
                  backgroundImage: songcover ? `url(${songcover})` : undefined
                }}
              >
                <FormDataInputField
                  inputTitle="song cover image"
                  inputType="file"
                  formData={formData}
                  formDataKey="cover"
                  setFormDataFuncton={setFormData}
                  minlength={0}
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      var file = e.target.files[0];
                      setFormData("cover", file, 0)
                      const imageUrl = URL.createObjectURL(file); // Create a URL for the file
                      setSongcover(imageUrl);
                    }
                  }}
                >
                </FormDataInputField>
              </div>

              <input className='default-button' type='submit' value='Update Info'
                disabled={0 >= Object.values(formData).length ? true : false}
                style={{ opacity: 0 >= Object.values(formData).length ? .3 : 1 }}
                onClick={updateSongInfo}
              />
              <input className='default-button btn-delete' type='button' value='Delete Song'
                style={{
                  background: 'rgba(var(--clr-background-lighter))',
                  color: 'rgba(var(--clr-font))'
                }} />
            </div>
          </div>
          :
          null
      }
    </form>
  )
}
