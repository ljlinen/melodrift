import React, { useEffect, useState } from 'react'
import './css/loginsignuppage.css'
import { baseUrl } from '../..'
import { useNavigate } from 'react-router-dom'

export default function LoginSignupPage() {

    const [loginTabOpen, setLoginTabOpen] = useState(true)
    // const [usernameAvailable, setUsernameAvailable] = useState()
    const [userProfilePhoto, setUserProfilePhoto] = useState()
    
    const navigate = useNavigate()
    const [pageActive, setPageActive] = useState(false)
    const [infoMessage, setInfoMessage] = useState({
            infoCode: undefined,
            infoMessage: undefined,
        })

    
    // const [dialog, setDialog] = useState({

    //     heading: undefined,
    //     message: undefined,
    
    //     negative: {
    //     value: undefined,
    //     func: undefined,
    //     },
    
    //     positive: {
    //     value: undefined,
    //     func: undefined,
    //     }
    // })

    const [loginData, setLoginData] = useState({
            username: undefined,
            password: undefined,
        })

    const [signupData, setSignupData] = useState({
            username: undefined,
            name: undefined,
            cover: "https://i.pinimg.com/736x/c0/9b/3f/c09b3fcbc73790a6dc94eead8739bd7d.jpg",
            location: "",
            email: undefined,
            password: undefined,

            music: {
                pinned: "",
                all: [],
          }
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
        
        fetch(baseUrl + '/profile/' + loginData.username, {
            method: 'GET',
        }).then((response) => {
            if(response.status === 200) {
                return response.json()
            }
        }).then((result) => {
            result['cover'] ? setUserProfilePhoto(result.cover) : setUserProfilePhoto(false);
        }).catch((error) => {
            console.log(error); 
        })
    }

    const Login = () => {
        
        
        fetch(baseUrl + '/profile', {
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
                console.log(result, 'pasing result');
                setPageActive(false)
                navigate('/profile/null', { state: { loggedInData: result } });
            }
            
        }).catch((error) => {
            // setDialog({
            //     heading: 'Error Logging In',
            //     message: 'Check your network',
            //     positive: {
            //         value: 'Okay',
            //         callback: undefined,
            // }});
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
        <div className="loginsignup-div-main"
            style={{opacity: pageActive ? 1 : 0}}
        >
        {/* {
            dialog.heading && <Dialog
                heading={dialog.heading}
                message={dialog.message}
                negative={dialog.negative}
                positive={dialog.positive}
                />
        } */}

            <div className='login-div-main'>
                <nav>
                    <div className='nav-div-heading'>
                        <p>{ loginTabOpen ? 'Signup To' : 'Login To'}</p>
                        <p className='logo'>Melodrift</p>
                    </div>

                    <p className='p-button' onClick={() => {setLoginTabOpen(!loginTabOpen)}}>{loginTabOpen ? 'Signup' : 'Login'}</p>
                </nav>



                <div className='login-div-inputswrapper'
                        style={{
                            minHeight: loginTabOpen ? '90vh' : 0,
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
                    {userProfilePhoto && <img className='background-image'  alt='background' 
                        src={userProfilePhoto ? userProfilePhoto : undefined}
                        // onError={() => set(false)}
                        style={{opacity: userProfilePhoto ? 1 : 0}}
                        />}

                </div>
            </div>

    <div className='signup-div-main'>
        <div className='signup-div-inputswrapper' 
                style={{
                    minHeight: !loginTabOpen ? '90vh' : 0,
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
                <p>country and province/state</p>
                <input type='text'
                    style={{border: signupData.location ? 'initial' : '1px solid red'}}
                    onChange={(e) => {setDataObject(setSignupData, 'location', e.target.value, 9)}}
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
                        signupData.location &&
                        signupData.password
                    ) ? false : true
                }
                style={{
                    backgroundColor:                     (
                        signupData.username && 
                        signupData.name &&
                        signupData.email &&
                        signupData.location &&
                        signupData.password
                    ) ? 'revert' : 'gray',
                    color:                     (
                        signupData.username && 
                        signupData.name &&
                        signupData.email &&
                        signupData.location &&
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
    