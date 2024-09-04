import React, { createContext, useEffect, useState } from "react";
import "./css/artistprofile.css";

import varified from "../../asset/img/icon/verified.svg";
import plays from "../../asset/img/icon/play.svg";
import search from "../../asset/img/icon/search.svg";
import cancel from "../../asset/img/icon/cancel.svg";
import followers from "../../asset/img/icon/followers.svg";
import { Outlet, useLocation, useParams } from "react-router-dom";
import MusicList from "./MusicList";
import { baseUrl } from "../..";

export const UsernameContext = createContext()

export default function ArtistProfile() {
  // const params = useParams();
  const [artistProfileData, setArtistProfileData] = useState();
  const [artistMusicData, setArtistMusicData] = useState();
  const [searching, setSearching] = useState();
  const [error, setErrorMessage] = useState();
  const location = useLocation();
  const { loggedInData } = location.state || {};
  // const { username } = location.state || {};
  const { refresh } = location.state || {};
  const [pageActive, setPageActive] = useState(false);
  const params = useParams()

  // const loggedInData = {
  //         username: 'undefined',
  //         name: 'undefined',
  //         email: undefined,
  //         phone: undefined,
  //         password: undefined,
  //         cover: "https://i.pinimg.com/736x/c0/9b/3f/c09b3fcbc73790a6dc94eead8739bd7d.jpg",
  //         location: "boooob",
  //         likes: "0",
  //         plays: "0",
  //         Image: "link",

  //         music: {
  //             pinned: "",
  //             all: [],
  //     }
  // }

  // const [dialog, setDialog] = useState({

  //         heading: undefined,
  //         message: undefined,

  //         negative: {
  //         value: undefined,
  //         callback: undefined
  //         },

  //         positive: {
  //         value: undefined,
  //         callback: undefined,
  //         }
  // })

  useEffect(() => {
    setPageActive(true);

    if (loggedInData && loggedInData["username"]) {
      setArtistProfileData(loggedInData);
      setArtistMusicData(loggedInData["music"]["all"]);
    } else {
      fetch(baseUrl + "/profile/" + params.username)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((result) => {
          if (result && result["username"]) {
            setArtistProfileData(result);
            if (result.hasOwnProperty("music")) {
              setArtistMusicData(result.music.all);
            }
          } else {
            return console.log("not containing username");

            // setDialog({
            //     heading: 'Error Getting Profile',
            //     message: 'profile does not found',
            //     positive: {
            //         value: 'Okay',
            //         callback: null
            //     }
            // })
          }
        })
        .catch((err) => {
          setErrorMessage(error);
          throw err;
        });
    }

    console.log('artist profile data ', artistProfileData);

    return () => {
        setPageActive(false)
    }
  }, [refresh, artistProfileData, error, loggedInData, params.username]);

  return (
    artistProfileData && <UsernameContext.Provider value={artistProfileData.username}>
    <div
      className="profile-div-main-artist">
      {/* {<Dialog 
        heading={dialog.heading}
        message={dialog.message}
        negative={dialog.negative}
        positive={dialog.positive}
        />} */}

      {artistProfileData && (
        <div className="wrap-info-about"
        style={{ opacity: pageActive ? 1 : 0 }}
        >
          <nav>
            <p>Melodrift</p>
            <div className="nav-div-search">
              <input
                style={{ display: searching ? "unset" : "none" }}
                onFocus={() => setSearching(true)}
                className="input-search"
                type="text"
              />
              <div
                className={
                  searching
                    ? "search-div-result-list slideDown"
                    : "search-div-result-list"
                }
              >
                {searching ? <p>searching</p> : <p>not searching</p>}
              </div>
              <img
                onClick={() => setSearching(!searching)}
                className="i nav-img-search"
                src={searching ? cancel : search}
                alt="search"
              />
            </div>
          </nav>

          <div className="wrap-info-stats">
            <div className="info">
              <div className="wrap-name-varified">
                <h1 className="name">{artistProfileData.name}</h1>
                <img className="icon" src={varified} alt="verified" />
              </div>
              <h2 className="location">{artistProfileData.location}</h2>
            </div>

            <div className="stats">
              <div>
                <img className="icon" src={followers} alt="followers" />
                <p>{artistProfileData.likes}</p>
              </div>

              <div>
                <img className="icon" src={plays} alt="plays" />
                <p>{artistProfileData.plays}</p>
              </div>
            </div>
          </div>

          <div className="about">
            <input type="button" value="play all" />
          </div>

        <div className="background">
            <div className="background-color" />
            <div className="background-color-two" />
            {artistProfileData.cover && <img
              alt="background"
              src={artistProfileData.cover}
              style={{ opacity: pageActive ? 1 : 0 }}
            />}
          </div>
        </div>
      )}

      {/* <MusicList MusicListData={artistMusicData} listTitle={'pinned song'} /> */}
      <MusicList MusicListData={artistMusicData} listTitle={"all music"} />
      <Outlet />
    </div>
    </UsernameContext.Provider>
  );
}
