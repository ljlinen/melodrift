import React, { useEffect, useState } from 'react'
import './css/loginsignuppage.css'
import { baseFetch, baseUrl, setDataObject, ShowInfoMessage } from '../..'
import { useNavigate } from 'react-router-dom'
import InputField from './InputField'
import Dialog from './Dialog'

export default function LoginSignupPage() {
    
    const navigate = useNavigate()

    const [loginTabOpen, setLoginTabOpen] = useState(true)
    const [userProfilePhoto, setUserProfilePhoto] = useState()
    const [infoMessage, setInfoMessage] = useState()
    const [pageActive, setPageActive] = useState(true)
    const [showDialog, setShowDialog] = useState()
    const [usernameAvailableTitle, setUsernameAvailableTitle] = useState()

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

    const checkusernameAvailable = async() => {

        try{
            const booleanObject = await baseFetch({
                route: '/account/signup/' + signupData.username,
                method: 'GET',
            })
       
            if(booleanObject['success']) {
                ShowInfoMessage(undefined, booleanObject['message'], setInfoMessage, false)
                setUsernameAvailableTitle(booleanObject['message'])
            }
                
        } catch(errorMessage) {
            ShowInfoMessage(undefined, errorMessage, setInfoMessage, false)
            setUsernameAvailableTitle(errorMessage)
            console.log(errorMessage); 
        }
    }

    const fetchUserProfilePhoto = () => {
        
        fetch(baseUrl + '/profile/' + loginData.username, {
            method: 'GET',
        }).then((response) => {
            if(response.status === 200) {
                return response.text()
                // return response.json()
            }
        }).then((result) => {
            console.log(result);
            
            result['cover'] ? setUserProfilePhoto(result.cover) : setUserProfilePhoto(false);
        }).catch((error) => {
            console.log(error); 
        })
    }

    const Login = async() => {   
        
        try{
            const userObject = await baseFetch({
                route: '/profile',
                method: 'PUT',
                body: JSON.stringify(loginData),
                headers: {'Content-Type': 'application/json'}
            })
            
            if(userObject && userObject['data'] && userObject['data']['username']) {
                localStorage.setItem('token', userObject['data']['token'])
                setPageActive(false)
                navigate('/profile', {
                    state: { userObject: userObject['data'] }
                });
            }
                
        } catch(error) {
            ShowInfoMessage('Error Logging In', error, setInfoMessage, true);
            console.log(error); 
        }
    }

    const SignUp = async() => {

        try{
            const userObject = await baseFetch({
                route: '/account/signup',
                method: 'PUT',
                body: JSON.stringify(signupData),
                headers: {'Content-Type': 'application/json'}
            })
            
            if(userObject && userObject['success']) {
                setInfoMessage(undefined, "Account created. Now Login using your details", setInfoMessage, false)
                console.log(infoMessage);
                
                setLoginTabOpen(true)
            }
                
        } catch(error) {
            ShowInfoMessage('Error Signing up', error, setInfoMessage, true);
            console.log(error); 
        }
    }


    return (
        <div className="loginsignup-div-main" style={{opacity: pageActive ? 1 : 0}}>       
            { showDialog ? (
                <Dialog
                    heading={infoMessage.heading}
                    message={infoMessage.message}
                />
            ) : null }
            <div className='login-div-main'>
                <nav>
                    <div className='nav-div-heading'>
                        <p className='logo'>Melodrift</p>
                        <p>{ loginTabOpen ? 'Login' : 'Signup'}</p>
                    </div>

                    <p className='p-button' onClick={() => {
                        setLoginTabOpen(!loginTabOpen)
                        loginTabOpen ? 
                        ShowInfoMessage(undefined, 'lets create your account', setInfoMessage, false) :
                        ShowInfoMessage(undefined, 'login to your account', setInfoMessage, false)
                        }}>{loginTabOpen ? 'Signup' : 'Login'}</p>
                </nav>



                <div className='login-div-inputswrapper'
                        style={{
                            minHeight: loginTabOpen ? '90vh' : 0,
                            opacity: loginTabOpen ? '1' : 0,
                        }}>

                    {                    
                        <p className='login-p-infomsg'>
                            {
                                infoMessage && loginTabOpen ? infoMessage.message : 
                                'Login or click signup to create an account'
                            }
                        </p>
                    }

                    <InputField
                        inputTitle='username'
                        inputType='text'
                        object={loginData}
                        objectkey='username'
                        objectSetter={setLoginData}
                        mainDataObjectSetter={setDataObject}
                        minlength={3}
                        onBlur={loginData.username ? fetchUserProfilePhoto : undefined}
                        required
                    />

                    <InputField
                        inputTitle='password'
                        inputType='password'
                        object={loginData}
                        objectkey='password'
                        objectSetter={setLoginData}
                        mainDataObjectSetter={setDataObject}
                        minlength={5}
                        required
                    />

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
                        src={userProfilePhoto ? userProfilePhoto : undefined}
                        style={{opacity: userProfilePhoto ? 1 : 0}}
                    />
                </div>
            </div>

    <div className='signup-div-main'>
        <div className='signup-div-inputswrapper' 
                style={{minHeight: !loginTabOpen ? '90vh' : 0, opacity: !loginTabOpen ? '1' : 0}}>
            {
                infoMessage && !loginTabOpen ?
                (<p className='login-p-infomsg'>{ infoMessage.message }</p>)
                : null
            }
            

            <InputField
                inputTitle='username'
                inputType='text'
                object={signupData}
                objectkey='username'
                objectSetter={setSignupData}
                mainDataObjectSetter={setDataObject}
                minlength={3}
                onBlur={signupData.username ? checkusernameAvailable : undefined}
                title={ usernameAvailableTitle ? usernameAvailableTitle : undefined }
                required
            />

            <InputField
                inputTitle='artist or stage name'
                inputType='text'
                object={signupData}
                objectkey='name'
                objectSetter={setSignupData}
                mainDataObjectSetter={setDataObject}
                minlength={2}
                title='hiiii'
                required
            />

            <InputField
                inputTitle='country and province'
                inputType='text'
                object={signupData}
                objectkey='location'
                objectSetter={setSignupData}
                mainDataObjectSetter={setDataObject}
                minlength={6}
            />

            <InputField
                inputTitle='email'
                inputType='email'
                object={signupData}
                objectkey='email'
                objectSetter={setSignupData}
                mainDataObjectSetter={setDataObject}
                minlength={5}
            />

            <InputField
                inputTitle='create passsword'
                inputType='password'
                object={signupData}
                objectkey='password'
                objectSetter={setSignupData}
                mainDataObjectSetter={setDataObject}
                minlength={5}
            />

            <input className='signup-button' type='button' value='Create Account' 
                disabled={
                    Object.values(signupData).every(value => value) ? false : true
                }
                style={{
                    backgroundColor: Object.values(signupData).every(value => value) ? 'revert' : 'gray',
                    color: Object.values(signupData).every(value => value) ? 'black' : 'revert'
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
    