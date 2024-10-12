import React, { useEffect, useState } from "react";
import "./css/audiouploader.css";
import cancel from "../../asset/img/icon/cancel.svg";
import { baseFetch, ShowInfoMessage } from "../..";
import { useNavigate } from "react-router-dom";
import FormDataInputField from "./FormDataInputField";
import Dialog from "./Dialog";
import Loader from "./Loader";
import useLoginContext from "../hooks/useLoginContext";
import useArtistMusicListContext from "../hooks/useArtistMusicListContext";

export default function AudioUploader() {

  const navigate = useNavigate();
  const { userLogin } = useLoginContext()
  const { musiclistdispatch } = useArtistMusicListContext()

  const [pageActive, setPageActive] = useState(false);
  const [infoMessage, setInfoMessage] = useState();
  const [songcover, setSongcover] = useState();
  const [uploading, setUploading] = useState()

  const [formData, setformData] = useState({
        year: new Date().getFullYear(),
        genre: 'other',
        cover: null
  });


  // UseEffects
  useEffect(() => {
    setPageActive(true);

    return () => {
      setPageActive(false);
    };
  }, []);

  useEffect(() => {
    if(!userLogin || !userLogin["username"]) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [userLogin]);


  // Component Specific Functions
  const setFormData = (key, value, minlength) => {
 
    if(value.length <= minlength) {
      return false
    } else {
      setformData((prev) => ({...prev, [key]: value}))
      return true
    }
  }

  const uploadSong = async (e) => {
    
    e.preventDefault();

    const finalFormData = new FormData()
    finalFormData.set("username", userLogin?.username);

    for (let key in formData) {
      finalFormData.set(key, formData[key]);
    };

    // finalFormData.forEach((value, key) => {
    //   console.log(key, value);
    // }) 

    try {
      setUploading(true)

      const uploadedObject = await baseFetch({
        route: "/upload/song",
        method: "POST",
        body: finalFormData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (uploadedObject["success"]) {
        musiclistdispatch({type: 'ADD_SONG',  payload: uploadedObject['data']})
        ShowInfoMessage(
          "Song Uploaded Successfully!",
          uploadedObject["message"],
          setInfoMessage,
          true
        );
        setUploading(false)
        navigate(-1, { refresh: true });
      }
    } catch (error) {
      setUploading(false)
      ShowInfoMessage("Failed Uploading", error, setInfoMessage, true);
      console.log(error);
    }
  };


  // JSX
  return (
    <form
      className="au-div-main-audio-uploader"
      onSubmit={(e) => {
        e.preventDefault();
        uploadSong(e)
      }}
      style={{ opacity: pageActive ? 1 : 0 }}
    >
      {
        infoMessage ? 
        <Dialog heading={infoMessage.heading} message={infoMessage.message} />
        : 
        null
      }

    <div className='au-form-head'>
      {
        !uploading ?
        <div className="au-div-heading-and-btn">
            <img
              className="icon cancel"
              alt="close"
              src={cancel}
              onClick={() => {
                navigate(-1);
              }}
            />
            <h3>Song Info</h3>
        </div>
        :
        <div className="au-div-heading-and-btn">
          <Loader load={uploading} style={{width: '30%'}} />
          <h3>Uploading...</h3>
        </div>
      }
      
      {
        !uploading ?
        <>
          <h5>combined files size should be less than 18MB</h5>
          <p>cos why would a song be more than 10mb? are you uploading a mixtape or something?</p>
          <p>we donth du dath hear</p>
        </>
        :
        <>
          <h5>Hold on while i upload this banger</h5>
          <p>I hope the beats fire...</p>
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
            defaultValue={'Other'}
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


        <div className="au-form-head" style={{marginLeft: -50}}>
          <h5>upload song and cover</h5>
          <p>you can upload without cover. song infomation is editable later.</p>
        </div>

        <div className="flex-columns">

            {/* <FormDataInputField
              inputTitle="year"
              inputType="number"
              formData={formData}
              formDataKey="year"
              setFormDataFuncton={setFormData}
              minlength={3}
            /> */}

          <div>
            <div className='audio-input'>
              <p>choose mp3 file</p>
              <FormDataInputField
                  inputTitle="upload song"
                  inputType="file"
                    formData={formData}
                  formDataKey="year"
                    setFormDataFuncton={setFormData}
                  minlength={0}
                  accept="audio/*"
                  required
                    onChange={(e) => {
                      if (e.target.files) setFormData("file", e.target.files[0])
                    }}
                  />
            </div>

            <ul className="note">
              <li>audio type: mp3</li>
              <li>image type: jpg</li>
            </ul>
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

            <input className="default-button" type="submit" value="Upload Song" />  
          </div>
        </div>
      </div>
      :
      null
    }
    </form>
  );
}
