import React, { createContext, useEffect, useState } from "react";
import "./css/artistprofile.css";

import varified from "../../asset/img/icon/verified.svg";
import plays from "../../asset/img/icon/play.svg";
import search from "../../asset/img/icon/search.svg";
import cancel from "../../asset/img/icon/cancel.svg";
import followers from "../../asset/img/icon/followers.svg";
import { Outlet, useLocation, useParams } from "react-router-dom";
import MusicList from "./MusicList";
import MainAudioPlayer from "./MainAudioPlayer"
import { baseFetch } from "../..";
export const ProfileContext = createContext()

export default function ArtistProfile() {
  // const params = useParams();
  const [artistProfileData, setArtistProfileData] = useState();
  const [artistMusicData, setArtistMusicData] = useState();
  const [searching, setSearching] = useState();
  // const [error, setErrorMessage] = useState();
  const location = useLocation();
  const params = useParams()
  const username = params.username;
  const { refresh } = location.state || {};
  const [pageActive, setPageActive] = useState(false);

  const [mainSong, setMainSong] = useState({
    SongData: undefined,
    SongObj: undefined
  })

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
    
    const loadPage = async() => {

      try{
        const responseObject = await baseFetch({
            route: '/artist/' + username,
            method: 'GET',
        })
        
        if(responseObject["success"] && responseObject['data']) {
          const userObject = JSON.parse(responseObject['data'])
          if(userObject['username'])
            setPageActive(true);
            setArtistProfileData(userObject);
            setArtistMusicData(userObject['music']['all']);
        }
              
      } catch(error) {
          // setDialog({
          //     heading: 'Error Logging In',
          //     message: 'Check your network',
          //     positive: {
          //         value: 'Okay',
          //         callback: undefined,
          //     }
          // });
          console.log(error); 
      }
    }

    loadPage()

    return () => {
        setPageActive(false)
        setArtistProfileData(null)
        setArtistMusicData(null)
    }
  }, [username, refresh]);

  return (
    artistProfileData && <ProfileContext.Provider value={{ username, setMainSong }}>
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
        style={{ opacity: pageActive ? 1 : .5 }}
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
              <p className="location">{artistProfileData.location}</p>
            </div>

            <div className="stats">
              <div>
                <img className="icon" src={followers} alt="followers" />
                <p>{artistProfileData.followers}</p>
              </div>

              <div>
                <img className="icon" src={plays} alt="plays" />
                <p>{artistProfileData.plays}</p>
              </div>
            </div>
          </div>

          <div className="about">
            <input className="default-button" type="button" value="play all" />
          </div>

        <div className="background">
            <div className="background-color" />
            <div className="background-color-two" />
            <img
              alt="background"
              src={artistProfileData.cover ? artistProfileData.cover : undefined}
              style={{ opacity: artistProfileData.cover ? 1 : 0 }}
            />
          </div>
        </div>
      )}

      {/* <MusicList MusicListData={artistMusicData} listTitle={'pinned song'} /> */}
      <MusicList MusicListData={artistMusicData} listTitle={"all music"} admin={false} />
      <Outlet />
      {
        mainSong && <MainAudioPlayer mainSong={mainSong} />
      }
    </div>
    </ProfileContext.Provider>
  );
}
