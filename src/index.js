import React from "react";
import "./css/index.css";

import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ArtistProfileAdmin from "./js/page/ArtistProfileAdmin";
import LoginSignupPage from "./js/page/LoginSignupPage";
import AudioUploader from "./js/comp/AudioUploader";
import MainAudioPlayer from "./js/comp/MainAudioPlayer";
import SongUpdateInfo from "./js/comp/UpdateSongForm";
import HomePage from "./js/page/HomePage";
import { LoginContextProvider } from "./js/context/LoginContext";
import ViewDebugger from "./js/page/ViewDebugger";
import { ArtistMusicListContextProvider } from "./js/context/ArtistMusicListContext";
import { MainSongContextProvider } from "./js/context/MainSongContext";
import UploadPage from "./js/page/UploadPage";
import UpdateProfileForm from "./js/comp/UpdateProfileForm";

// export const baseUrl = 'https://melodriftbackend.linendev.workers.dev'
export const baseUrl = "http://localhost:8787";

// Global Functons For Reusability

export const baseFetch = async ({ route, method, body, headers }) => {
  try {
    const options = { method: method, body: body, headers: headers };
    const response = await fetch(baseUrl + route, options);
    const responseObject = await response.json();

    if (responseObject["success"] || responseObject["data"]) {
      console.log("fetch, success", responseObject);
      return responseObject;
    } else {
      console.log(
        "fetch, fail",
        response.statusText,
        responseObject["message"]
      );
      throw responseObject["message"];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const setDataObject = (setobject, key, value, minlength) => {
  if (value.length <= minlength) {
    setobject((prev) => ({ ...prev, [key]: undefined }));
  } else {
    setobject((prev) => ({ ...prev, [key]: value }));
  }
};

export const ShowInfoMessage = (heading, message, setInfoMessage, close) => {
  setInfoMessage({ heading, message });

  if (close) {
    setTimeout(() => {
      setInfoMessage(undefined);
    }, 4000);
  }
};

export const updateSong = async (username, key, songId) => {
  const payload = {
    username: username,
    songId: songId,
    key: key,
  };

  try {
    const updatedObj = await baseFetch({
      route: "/update/song",
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

    if (updatedObj["success"] && key === "likes") {
      console.log("returned true");
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleShare = async (title, text, url) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: text,
        url: url,
      });
      console.log("Successfully shared");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  } else {
    console.log("Web Share API is not supported in your browser.");
  }
};

export const onSkip = (
  mainSongIndex,
  mainsongdispatch,
  dataLength,
  nextORprevious
) => {
  console.log(mainSongIndex, mainsongdispatch, dataLength, nextORprevious);
  const index = mainSongIndex ?? 0;
  const max = dataLength - 1;

  switch (nextORprevious) {
    case "next":
      index >= max
        ? mainsongdispatch({ type: "SET_SONG", payload: { i: 0 } })
        : mainsongdispatch({ type: "SET_SONG", payload: { i: index + 1 } });
      break;
    case "previous":
      index <= 0
        ? mainsongdispatch({ type: "SET_SONG", payload: { i: max } })
        : mainsongdispatch({ type: "SET_SONG", payload: { i: index - 1 } });
      break;
    default:
  }
};

export function formatToK(num) {
  if (Math.abs(num) < 1000) return num.toString();
  return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
}


// end

// Routes defining for the application

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/song/:songid",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginSignupPage />,
  },
  {
    path: "/upload",
    element: <UploadPage />,
  },
  {
    path: "/profile/:username",
    element: <ArtistProfileAdmin />,
    children: [
      {
        path: "upload",
        element: <AudioUploader />,
      },
      {
        path: "mainaudioplayer",
        element: <MainAudioPlayer />,
      },
      {
        path: "updatesonginfo",
        element: <SongUpdateInfo />,
      },
      {
        path: "updateprofileinfo",
        element: <UpdateProfileForm />,
      },
    ],
  },
  // {
  //   path: "/artist/:username",
  //   element: <ArtistProfile />,
  //   errorElement: <h2>Artist Not Found</h2>,
  // },
  {
    path: "/vd",
    element: <ViewDebugger />,
  },
]);

// end

root.render(
  // <React.StrictMode>
  <LoginContextProvider>
    <ArtistMusicListContextProvider>
      <MainSongContextProvider>
        <RouterProvider router={router} />
      </MainSongContextProvider>
    </ArtistMusicListContextProvider>
  </LoginContextProvider>
  // {/* </React.StrictMode> */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
