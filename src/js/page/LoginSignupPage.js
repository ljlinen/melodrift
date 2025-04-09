import React, { useEffect, useState } from "react";
import { baseFetch, setDataObject, ShowInfoMessage } from "../..";
import { useNavigate } from "react-router-dom";

import InputField from "../comp/InputField";
import Dialog from "../comp/Dialog";
import useLoginContext from "../hooks/useLoginContext";
import FormDataInputField from "../comp/FormDataInputField";
import Footer from "../comp/Footer";
import "../comp/css/loginsignuppage.css";
import useFetchCoverFile from "../hooks/useFetchCoverFile";

export default function LoginSignupPage() {
  const { userLogin, dispatch } = useLoginContext();
  const [coverId, setCoverId] = useState(null);
  const userProfilePhoto = useFetchCoverFile(coverId)

  const navigate = useNavigate();

  const [loginTabOpen, setLoginTabOpen] = useState(true);
  const [songcover, setSongcover] = useState();
  const [infoMessage, setInfoMessage] = useState();
  const [pageActive, setPageActive] = useState(true);
  // eslint-disable-next-line
  const [showDialog, setShowDialog] = useState();
  const [usernameAvailableTitle, setUsernameAvailableTitle] = useState();
  const [loginData, setLoginData] = useState({});
  const [formData, setformData] = useState({});

  // UseEffects
  useEffect(() => {
    setPageActive(true);

    return () => {
      setPageActive(false);
    };
  }, []);

  useEffect(() => {
    userLogin && navigate("/profile/:username");
    // eslint-disable-next-line
  }, [userLogin]);

  // Component-Specific Functions
  const setFormData = (key, value, minlength) => {
    if (value.length <= minlength) {
      delete formData[key];
      return false;
    } else {
      setformData((prev) => ({ ...prev, [key]: value }));
      return true;
    }
  };

  const checkusernameAvailable = async () => {
    try {
      const booleanObject = await baseFetch({
        route: "/account/signup/" + formData.username,
        method: "GET",
      });

      setUsernameAvailableTitle(booleanObject["message"]);
    } catch (errorMessage) {
      ShowInfoMessage(undefined, errorMessage, setInfoMessage, false);
      setUsernameAvailableTitle(errorMessage);
      console.log(errorMessage);
    }
  };

  const fetchUserProfilePhoto = async () => {
    try {
      const userObject = await baseFetch({
        route: "/artist/" + loginData.username,
        method: "GET",
      });

      if(!userObject?.data) return
      const data = JSON.parse(userObject.data)
    
      data && setCoverId(data.cover);
    } catch (error) {
      console.log(error);
    }
  };

  const Login = async () => {
    try {
      const userObject = await baseFetch({
        route: "/profile",
        method: "PUT",
        body: JSON.stringify(loginData),
        headers: { "Content-Type": "application/json" },
      });

      if (userObject && userObject["data"] && userObject["data"]["username"]) {
        localStorage.setItem("token", userObject["data"]["token"]);

        dispatch({ type: "LOGIN", payload: userObject["data"] });
        setPageActive(false);
        navigate("/profile/:username");
      }
    } catch (error) {
      ShowInfoMessage("Error Logging In", error, setInfoMessage, true);
      console.log(error);
    }
  };

  const SignUp = async (e) => {
    e.preventDefault();

    const finalFormData = new FormData();

    for (let key in formData) {
      finalFormData.set(key, formData[key]);
    }

    try {
      const userObject = await baseFetch({
        route: "/account/signup",
        method: "PUT",
        body: finalFormData,
      });

      if (userObject && userObject["success"]) {
        setInfoMessage(
          undefined,
          "Account created. Now Login using your details",
          setInfoMessage,
          false
        );
        console.log(infoMessage);

        setLoginTabOpen(true);
      }
    } catch (error) {
      ShowInfoMessage("Error Signing up", error, setInfoMessage, true);
      console.log(error);
    }
  };

  // JSX
  return (
    <div
      className="loginsignup-div-main"
      style={{ opacity: pageActive ? 1 : 0 }}
    >
      {showDialog ? (
        <Dialog heading={infoMessage.heading} message={infoMessage.message} />
      ) : null}
      <div className="login-div-main">
        <nav>
          <div className="nav-div-heading">
            <p className="logo">Melodrift</p>
            <p>{loginTabOpen ? "Login" : "Signup"}</p>
          </div>
          {!userLogin ? (
            <p
              className="default-button"
              onClick={() => {
                setLoginTabOpen(!loginTabOpen);
                loginTabOpen
                  ? ShowInfoMessage(
                      undefined,
                      "lets create your account",
                      setInfoMessage,
                      false
                    )
                  : ShowInfoMessage(
                      undefined,
                      "login to your account",
                      setInfoMessage,
                      false
                    );
              }}
            >
              {loginTabOpen ? "Signup" : "Login"}
            </p>
          ) : (
            <p className="default-button">Welcome {userLogin["username"]}</p>
          )}
        </nav>

        <div
          className="login-div-inputswrapper"
          style={{
            minHeight: loginTabOpen ? "70vh" : 0,
            opacity: loginTabOpen ? "1" : 0,
            padding: 24,
            justifyContent: 'end',
            paddingBottom: loginTabOpen ? 100 : 0,
          }}
        >
          {
            <h6 className="login-p-infomsg">
              {infoMessage && loginTabOpen
                ? infoMessage.message
                : "Login or click signup to create an account"}
            </h6>
          }

          <InputField
            inputTitle="username"
            inputType="text"
            object={loginData}
            objectkey="username"
            objectSetter={setLoginData}
            mainDataObjectSetter={setDataObject}
            minlength={3}
            onBlur={loginData.username ? fetchUserProfilePhoto : undefined}
            required
          />

          <InputField
            inputTitle="password"
            inputType="password"
            object={loginData}
            objectkey="password"
            objectSetter={setLoginData}
            mainDataObjectSetter={setDataObject}
            minlength={5}
            required
          />

          <input
            className="default-button"
            type="button"
            value="Login"
            disabled={loginData.username && loginData.password ? false : true}
            style={{
              opacity:
                loginData.username && loginData.password ? "initial" : ".4",
              marginTop: 10,
              minWidth: 100
            }}
            onClick={Login}
          />
        </div>

        <div className="login-background">
          <div className="background-color" />
          <div className="background-color-two" />
          <img
            className="background-image"
            alt="background"
            src={userProfilePhoto ? userProfilePhoto : undefined}
            style={{ opacity: userProfilePhoto ? 1 : 0 }}
          />
        </div>
      </div>

      <form className="signup-div-main" onSubmit={SignUp}>
        {/* { 
          loginTabOpen ? 
          <div className="login-quicklinks">
            <h5>Quicklinks</h5>
            <ul>
              <li>Home</li>
              <li>Upload Your Music</li>
              <li>Terms and Conditions</li>
            </ul>
          </div> : null
        } */}
        <div
          className="signup-div-inputswrapper"
          style={{
            minHeight: !loginTabOpen ? "fit-content" : 0,
            opacity: !loginTabOpen ? "1" : 0,
            height: loginTabOpen && '20vh',
            paddingBottom: !loginTabOpen && 100,
          }}
        >
          <div className="au-form-head">
            <h5>provide infomation about you</h5>
            <p>This infomation is editable later.</p>
          </div>

          <FormDataInputField
            inputTitle="username"
            inputType="text"
            formData={formData}
            formDataKey="username"
            setFormDataFuncton={setFormData}
            minlength={3}
            onBlur={formData.username ? checkusernameAvailable : undefined}
            title={usernameAvailableTitle ? usernameAvailableTitle : undefined}
            required
          />

          <FormDataInputField
            inputTitle="artist or stage name"
            inputType="text"
            formData={formData}
            formDataKey="name"
            setFormDataFuncton={setFormData}
            minlength={2}
            required
          />

          <FormDataInputField
            inputTitle="country and province"
            inputType="text"
            formData={formData}
            formDataKey="location"
            setFormDataFuncton={setFormData}
            minlength={5}
            placeholder='example: (South Africa, MP)'
            required
          />

          <FormDataInputField
            inputTitle="email"
            inputType="email"
            formData={formData}
            formDataKey="email"
            setFormDataFuncton={setFormData}
            minlength={5}
            required
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
              inputTitle="password"
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
              value="Create Account"
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

      <Footer />
    </div>
  );
}
