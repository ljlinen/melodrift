import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ArtistProfile from './js/comp/ArtistProfile';

export const profileData = {
  "name": "futurealstic",
  "cover": "https://i.pinimg.com/736x/c0/9b/3f/c09b3fcbc73790a6dc94eead8739bd7d.jpg",
  "location": "South Africa, MP",
  "about": "An upcoming artist based in Mpumalanga, I'm into audio production, videography and graphic designing.",

  "likes": "15K",
  "plays": "2K",
  "Image": "link",

  "music": {
    "pinned": "link",
    "all": [
       {
          "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-2crR5T9FPOoVLRFSw5kS8YqbsWqPTh_UQ&s",
          "artist": "BMX 2Tone",
          "title": "X GeeFive - Get Demu Raithi Nawu (Official audio)",
          "audio": "https://github.com/ljlinen/melodrift/raw/main/api/artist/Linen%20-%20Benzo.mp3",
          "likes": "2000"
       },
         {
            "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-2crR5T9FPOoVLRFSw5kS8YqbsWqPTh_UQ&s",
            "artist": "Futurealstic",
            "title": "Zembe Interlude",
            "audio": "https://github.com/ljlinen/melodrift/raw/main/api/artist/Linen%20-%20Benzo.mp3"
         }
    ]
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([{
  path: '/',
  element: <App />
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
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
