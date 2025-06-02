import React, { useEffect, useState } from 'react'
import '../../css/page/uploadpage.css'
import FormDataInputField from '../comp/FormDataInputField'
  // eslint-disable-next-line
export default function UploadPage(id) {

  const [formData, setformData] = useState({
    year: new Date().getFullYear(),
    genre: "other",
    cover: null,
  });

  const [step, setStep] = useState(0);

  const titles = ['Choose your mp3 song', 'Provide song infomation']
  const descriptions = ["Don't upload copyrighted songs", 'you can skip artists and genre']

  // Component Specific Functions
  const setFormData = (key, value, minlength) => {
    if (value.length <= minlength) {
      delete formData[key];
      return false;
    } else {
      setformData((prev) => ({ ...prev, [key]: value }));
      return true;
    }
  };

  useEffect(() => {

    switch (step) {
      case 0:

        break;
    
      default:
        break;
    }

  }, [step])


  const handleSteps = () => {
    step < 2 ? setStep(step + 1) : setStep(0)
  }


  // JSX
  return (
    <div className='uploadpage-div-main'>
      <div className='div-header'>
        <h1>Melodrift</h1>
        <p>Upload you Song To Share</p>
      </div>

      <div className='div-body'>
        <form>
          <div className='au-form-head' style={{paddingBottom: 0}}>
                <h5>{titles[step]}</h5>
                <p>{descriptions[step]}</p>
          </div>

          <div className='main-wrap'>
            <div className={step === 0 ? 'current-wrap' : 'not-current-wrap'}>
                <div className="audio-input">
                <p>choose mp3 file</p>
                <FormDataInputField
                  inputTitle="upload song"
                  inputType="file"
                  formData={formData}
                  formDataKey="year"
                  setFormDataFuncton={setFormData}
                  minlength={0}
                  accept="audio/mpeg"
                  required
                  onChange={(e) => {
                    if (e.target.files) setFormData("file", e.target.files[0])
                  }}
                />
              </div>
            </div>

            <div className={step === 1 ? 'current-wrap' : 'not-current-wrap'}>
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

              <div
                className="div-inputwrap"
                style={{ width: "50%", alignSelf: "self-start" }}
              >
                <p>genre</p>
                <select
                  onChange={(e) => {
                    setFormData("genre", e.target.value, 0);
                  }}
                  defaultChecked={false}
                  style={{ color: "rgba(var(--clr-background), 1)" }}
                  required
                  defaultValue={"Other"}
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
            </div>
          </div>

          <input type='button' className='default-button' value='Upload' onClick={handleSteps} />
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
