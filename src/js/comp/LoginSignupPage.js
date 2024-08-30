import React, { useState } from 'react'
import './css/loginsignuppage.css'
import { baseUrl } from '../..'
import { useNavigate } from 'react-router-dom'
import defualtBackground from '../../asset/img/defaultBackground.png'

export default function LoginSignupPage() {

    const [loginTabOpen, setLoginTabOpen] = useState(true)
    // const [usernameAvailable, setUsernameAvailable] = useState()
    const [userProfilePhoto, setUserProfilePhoto] = useState()
    let prevUserProfilePhoto = userProfilePhoto;
    
    const navigate = useNavigate()

    const [infoMessage, setInfoMessage] = useState({
            infoCode: undefined,
            infoMessage: undefined,
        })

    const [loginData, setLoginData] = useState({
            username: undefined,
            password: undefined,
        })

    const [signupData, setSignupData] = useState({
            username: undefined,
            name: undefined,
            email: undefined,
            phone: undefined,
            password: undefined,
            cover: "https://i.pinimg.com/736x/c0/9b/3f/c09b3fcbc73790a6dc94eead8739bd7d.jpg",
            location: "",  
            likes: "0",
            plays: "0",
            Image: "link",

            music: {
                pinned: "",
                all: [],
          }
})

    const setDataObject = (setobject, key, value, minlength) => {
        
            if(value.length <= minlength) {
                setobject(prev => ({...prev, [key]: false}))
            } else {
                setobject(prev => ({...prev, [key]: value}))
            }
        }


    const checkEusernameAvailable = (desiredUsername) => {
        
        const data = {
            "username": desiredUsername
        }
        
        fetch(baseUrl + '/account/signup/available', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }

        }).then((response) => {
            if(response.status === 200) {
                return response.text()
            }
        }).then((result) => {
            if(result === 'true') {
                // setUsernameAvailable(true)
                setInfoMessage((prev) => ({...prev, infoMessage: undefined}))
            } else {
                // setUsernameAvailable(false);
                setInfoMessage((prev) => ({...prev, infoMessage: 'Username already taken, pick a different one.'}))
            }

        }).catch((error) => {
            console.log(error); 
        })
    }

    const fetchUserProfilePhoto = () => {
        
        fetch(baseUrl + '/artist/' + loginData.username, {
            method: 'GET',
        }).then((response) => {
            if(response.status === 200) {
                return response.json()
            }
        }).then((result) => {
            typeof result === 'object' ? setUserProfilePhoto(result.cover) : setUserProfilePhoto(false);
            console.log(result);
        }).catch((error) => {
            console.log(error); 
        })
    }

    const Login = () => {
        
        
        fetch(baseUrl + '/artist', {
            method: 'PUT',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json',
            }

        }).then((response) => {
            if(response.status === 200) {
                return response.json()
            } else {
                throw response.statusText
            }
        }).then((result) => {
            if(result.hasOwnProperty('username')) {
                navigate('/artist', { state: { loggedInData: result } });
            }
            console.log(result);
        }).catch((error) => {
            console.log(error); 
        })
    }

    const SignUp = () => {
        
        fetch(baseUrl + '/account/signup', {
            method: 'PUT',
            body: JSON.stringify(signupData),
            headers: {
                'Content-Type': 'application/json',
            }

        }).then((response) => {
            setInfoMessage((prev) => ({...prev, infoCode: response.status}))
            return response.text()
        }).then((result) => {
            if(result === 'true') {
                setLoginTabOpen(true)
                setInfoMessage((prev) => ({...prev, infoMessage: "Account created. Now Login using your details"}))
            } else {
                setLoginTabOpen(false)
                setInfoMessage((prev) => ({...prev, infoMessage: result}))     
            }
        }).catch((error) => {
            console.log(error); 
        })
    }


    return (
        <div className="loginsignup-div-main">
            <div className='login-div-main'>
        
                <nav onClick={() => {setLoginTabOpen(true)}}>
                    <div className='nav-div-heading'>
                        <p>Login to</p>
                        <p className='logo'>Melodrift</p>
                    </div>

                    <p>{ loginTabOpen ? 'skip' : 'or'}</p>
                </nav>

                <div className='login-div-inputswrapper'
                        style={{
                            height: loginTabOpen ? '80vh' : 0,
                            opacity: loginTabOpen ? '1' : 0,
                        }}>

                    <p className='login-p-infomsg'>{ loginTabOpen && infoMessage.infoMessage ? infoMessage.infoMessage : undefined}</p>

                    <div className='div-inputwrap'>
                        <p>username</p>
                        <input type='text' 
                            style={{border: loginData.username ? 'initial' : '1px solid red'}} 
                            onBlur={loginData.username ? fetchUserProfilePhoto : undefined} 
                            onChange={(e) => {
                                    setDataObject(setLoginData, 'username', e.target.value, 3)
                            }} 
                        />
                    </div>

                    <div className='div-inputwrap'>
                        <p>passsword</p>
                        <input type='password' 
                            style={{border: loginData.password ? 'initial' : '1px solid red'}} 
                            onChange={(e) => {
                                setDataObject(setLoginData, 'password', e.target.value, 5)
                            }}
                        />
                    </div>

                    <input className='login-button' type='button' value='Login' 
                        disabled={(loginData.username && loginData.password) ? false : true}
                        style={{
                            backgroundColor: (loginData.username && loginData.password) ? 'revert' : 'gray',
                            color: (loginData.username && loginData.password) ? 'black' : 'revert'
                        }}
                        onClick={Login}
                    />
                </div>
        
                <div className='login-background'>
                    <div className='background-color' />
                    <div className='background-color-two' />
                    <img className='background-image'  alt='background' 
                        src={userProfilePhoto ? prevUserProfilePhoto && userProfilePhoto : defualtBackground}
                        // onError={() => set(false)}
                        style={{opacity: userProfilePhoto ? 1 : 0}}
                        />

                </div>
            </div>

            <div className='signup-div-main'>
        
        <nav onClick={() => {setLoginTabOpen(false)}}>
            <div className='nav-div-heading'>
                <p>Signup for</p>
                <p className='logo'>Melodrift</p>
            </div>

            <p style={{filter: loginTabOpen ? 'contrast(.6)' : 'contrast(1)'}}>
                { !loginTabOpen ? 'skip' : 'or'}
            </p>
        </nav>

        <div className='signup-div-inputswrapper' 
                style={{
                    height: !loginTabOpen ? '80vh' : 0,
                    opacity: !loginTabOpen ? '1' : 0,
                    }}>
            <p className='signup-p-infomsg'>{infoMessage.infoMessage}</p>

            <div className='div-inputwrap'>
                <p>username</p>
                <input type='text'
                    style={{border: signupData.username ? 'none' : '1px solid red'}} 
                    value={loginTabOpen ? '' : null}
                    onBlur={(e) => {checkEusernameAvailable(e.target.value)}} 
                    onChange={(e) => {
                        setDataObject(setSignupData, 'username', e.target.value, 3)
                    }}
                    />
            </div>

            <div className='div-inputwrap'>
                <p>artist name / stage name</p>
                <input type='text' 
                    style={{border: signupData.name ? 'none' : '1px solid red'}}
                    value={loginTabOpen ? '' : null}
                    onChange={(e) => {setDataObject(setSignupData, 'name', e.target.value, 2)}}
                />
            </div>

            <div className='div-inputwrap'>
                <p>email</p>
                <input type='email'
                    onChange={(e) =>{setDataObject(setSignupData, 'email', e.target.value, 3)}}
                    style={{border: signupData.email ? 'initial' : '1px solid red'}}
                />
            </div>

            <div className='div-inputwrap'>
                <p>phone</p>
                <input type='tel'
                    style={{border: signupData.phone ? 'initial' : '1px solid red'}}
                    onChange={(e) => {setDataObject(setSignupData, 'phone', e.target.value, 9)}}
                />
            </div>

            <div className='div-inputwrap'>
                <p>create passsword</p>
                <input type='password'
                    style={{border: signupData.password ? 'initial' : '1px solid red'}}
                    onChange={(e) => {setDataObject(setSignupData, 'password', e.target.value, 5)}}
                />
            </div>
            <input className='signup-button' type='button' value='Create Account' 
                disabled={
                    (
                        signupData.username && 
                        signupData.name &&
                        signupData.email &&
                        signupData.phone &&
                        signupData.password
                    ) ? false : true
                }
                style={{
                    backgroundColor:                     (
                        signupData.username && 
                        signupData.name &&
                        signupData.email &&
                        signupData.phone &&
                        signupData.password
                    ) ? 'revert' : 'gray',
                    color:                     (
                        signupData.username && 
                        signupData.name &&
                        signupData.email &&
                        signupData.phone &&
                        signupData.password
                    ) ? 'black' : 'revert'
                }}
                onClick={SignUp}
            />
        </div>
    </div>

            <div className='footer-div-main'>
                <div>
                    <h3>Melodrift</h3>
                </div>
            </div>
        </div>
      )
    }
    