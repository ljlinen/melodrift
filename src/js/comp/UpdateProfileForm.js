import React, { useEffect, useState } from 'react'
import './css/audiouploader.css'
import './css/updateprofileinfo.css'
import { baseFetch } from '../..'
import { useNavigate } from 'react-router-dom'
import FormDataInputField from './FormDataInputField'
import useLoginContext from '../hooks/useLoginContext'
import close from "../../asset/img/icon/close.svg";


export default function UpdateProfileForm() {

  const { userLogin, dispatch } = useLoginContext()

  const navigate = useNavigate()

  const [songcover, setSongcover] = useState()
  const [formData, setformData] = useState({});
      // eslint-disable-next-line
  const [uploading, setUploading] = useState();
      // eslint-disable-next-line
  const [usernameAvailableTitle, setUsernameAvailableTitle] = useState();


  // UseEffect Section
  useEffect(() => {
    if(!userLogin || !userLogin["username"]) {
      navigate("/login");
    } else {
      setFormData('username', userLogin['username'], 0)
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
    if(value.length <= minlength) {
      delete formData[key]
      return false
    } else {
      setformData((prev) => ({...prev, [key]: value}))
      return true
    }
  }


  const updateProfileInfo = async(e) => {
    e.preventDefault()

    const finalFormData = new FormData()

    for (let key in formData) {
      console.log(key, formData[key]);
      finalFormData.set(key, formData[key]);
    };
    // return

    try{
        setUploading(true)
        const updateObject = await baseFetch({
            route: '/profile/updateprofileinfo',
            method: 'POST',
            body: finalFormData,
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        const dataObject = JSON.parse(updateObject?.data)
        
        // ShowInfoMessage('Profile Updated Successfully!', dataObject['message'], setInfoMessage, true);
        console.log('dispatching');
        dispatch({type: 'LOGIN',  payload: dataObject})
        navigate('/profile/:username', {replace: true});

    } catch(error) {
      setUploading(false)
      // ShowInfoMessage('Failed Updating Song', error, setInfoMessage, true);
      console.log(error); 
    }
  }


  return (
    userLogin?.username && <form className="signup-div-main upi-div-main" onSubmit={updateProfileInfo}>
    <div
      className="signup-div-inputswrapper"
      style={{
        minHeight: "fit-content",
        opacity: "1",
        paddingBottom: 100,
      }}
    >
        <div className="au-div-heading-and-btn">
          <div className="au-form-head">
            <h5>update profile infomation</h5>
            <p>Leave info empty to keep it unchanged.</p>
          </div>
          <img className='icon' src={close} alt='close' onClick={() => navigate(-1)} />
        </div>

      {/* <FormDataInputField
        inputTitle="username"
        inputType="text"
        formData={formData}
        formDataKey="username"
        setFormDataFuncton={setFormData}
        minlength={3}
        onBlur={formData.username ? checkusernameAvailable : undefined}
        title={usernameAvailableTitle ? usernameAvailableTitle : undefined}
        required
      /> */}

      <FormDataInputField
        inputTitle="artist or stage name"
        inputType="text"
        formData={formData}
        formDataKey="name"
        setFormDataFuncton={setFormData}
        minlength={2}
        placeholder={userLogin?.name ?? null}
      />

      <FormDataInputField
        inputTitle="country and province"
        inputType="text"
        formData={formData}
        formDataKey="location"
        setFormDataFuncton={setFormData}
        minlength={5}
        placeholder={userLogin?.location ?? 'example: (South Africa, MP)'}
      />

      <FormDataInputField
        inputTitle="email"
        inputType="email"
        formData={formData}
        formDataKey="email"
        setFormDataFuncton={setFormData}
        minlength={5}
        placeholder={userLogin?.email ?? 'enter new email'}
      />

      <div className="au-form-head">
        <h5>profile photo</h5>
        <p>provide only jpg format (you can skip this).</p>
      </div>

      <div
        className="cover-input-main"
        style={{ marginBottom: 25, gap: 0 }}
      >
        <div
          className="cover-input"
          style={{
            backgroundImage: songcover ? `url(${songcover})` : undefined,
            backgroundPosition: "center",
          }}
        >
          <FormDataInputField
            inputTitle="song cover image"
            inputType="file"
            formData={formData}
            formDataKey="cover"
            setFormDataFuncton={setFormData}
            minlength={0}
            accept="image/jpg"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                var file = e.target.files[0];
                setFormData("cover", file, 0);
                const imageUrl = URL.createObjectURL(file); // Create a URL for the file
                setSongcover(imageUrl);
              }
            }}
          ></FormDataInputField>
        </div>

        <FormDataInputField
          inputTitle="input password to update account"
          inputType="password"
          formData={formData}
          formDataKey="password"
          setFormDataFuncton={setFormData}
          minlength={5}
          required
        />

        <input
          className="default-button"
          type="submit"
          value="Save Infomation"
          disabled={
            Object.values(formData).every((value) => value) ? false : true
          }
          style={{
            opacity: Object.values(formData).every((value) => value)
              ? "initial"
              : ".4",
            marginTop: 30,
          }}
        />
      </div>
    </div>
  </form>
  )
}
