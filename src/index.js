import React, { createContext, useContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ArtistProfile from './js/comp/ArtistProfile';
import LoginSignupPage from './js/comp/LoginSignupPage';

export const baseUrl = 'http://localhost:8787';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([{
  path: '/',
  element: <LoginSignupPage />
},
{
  path: '/login',
  element: <LoginSignupPage />
},
{
  path: '/artist',
  element: <ArtistProfile />,
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
