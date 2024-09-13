import React from 'react';
import './css/index.css';

import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ArtistProfile from './js/comp/ArtistProfile';
import ArtistProfileAdmin from './js/comp/ArtistProfileAdmin';
import LoginSignupPage from './js/comp/LoginSignupPage';
import AudioUploader from './js/comp/AudioUploader';
import MainAudioPlayer from './js/comp/MainAudioPlayer'

export const baseUrl = 'https://melodriftbackend.linendev.workers.dev'
// export const baseUrl = 'http://localhost:8787'


// Global Functons For Reusability

export const baseFetch = async({ route, method, body, headers }) => {

  try{
    const options = { method: method, body: body, headers: headers };
    const response = await fetch(baseUrl + route, options);
    const responseObject = await response.json();

    if(responseObject['success'] || responseObject['data']) {
      console.log('fetch, success', responseObject);
      return responseObject
    } else {
      console.log('fetch, fail', response.statusText, responseObject['message']);
      throw responseObject['message']
    }

  } catch (error) {
    console.log(error);
    throw error
  }
  
}

export const setDataObject = (setobject, key, value, minlength) => {

  if(value.length <= minlength) {
      setobject(prev => ({...prev, [key]: undefined}))
  } else {
      setobject(prev => ({...prev, [key]: value}))
  }
}

export const ShowInfoMessage = (heading, message, setInfoMessage, close) => {

  setInfoMessage({ heading, message });

  if(close) {
    setTimeout(() => {
        setInfoMessage(undefined);
    }, 4000);
  }
}

// end


// Routes defining for the application

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([{
  path: '/',
  // below you test elements, remove them and uncomment the comented element when done.
  element: <LoginSignupPage />
  // element: <MusicList />
},
{
  path: '/login',
  element: <LoginSignupPage />
},
{
  path: '/profile',
  element: <ArtistProfileAdmin />,
  children: [{
    path: '/profile/upload',
    element: <AudioUploader />,
  },
  {
    path: '/profile/mainaudioplayer',
    element: <MainAudioPlayer />,
  }],
  errorElement: <h2>Profile Not Found</h2>
},
{
  path: '/artist/:username',
  element: <ArtistProfile />,
  errorElement: <h2>Artist Not Found</h2>
},
{
  path: '/song',
  element: <ArtistProfile />
}
])

// end

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
