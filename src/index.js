import React from 'react';
import './css/index.css';

import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ArtistProfile from './js/comp/ArtistProfile';
import LoginSignupPage from './js/comp/LoginSignupPage';
import AudioUploader from './js/comp/AudioUploader';

export const baseUrl = 'https://melodriftbackend.linendev.workers.dev';


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
  path: '/profile/:username',
  element: <ArtistProfile />,
  children: [{
    path: '/profile/:username/upload',
    element: <AudioUploader />,
  }],
  errorElement: <h2>Artist Not Found</h2>
},
{
  path: '/song',
  element: <ArtistProfile />
}
])

root.render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
