import React, { useEffect, useState } from "react";
import "./css/audioplayer.css";
import play from "../../asset/img/icon/play.svg";
import share from "../../asset/img/icon/share.svg";
import { handleShare } from "../..";
import edit from "../../asset/img/icon/edit.svg";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchSongData from "../hooks/useFetchSongData";
import useMainSongContext from "../hooks/useMainSongContext";
import useIsLoggedIn from "../hooks/useIsLoggedIn";

export default function AudioPlayer({ id, i, style, onClick, item }) {
  const { SongData, componentActive } = useFetchSongData(id);
  const { mainsongdispatch } = useMainSongContext();
  const isLoggedIn = useIsLoggedIn()

  // const [isLiked, setLiked] = useState(false);
  const [FetchedSongData, setFetchedSongData] = useState();

  const navigate = useNavigate();
  const location = useLocation()

  // All Functions
  
  useEffect(() => {
    if(SongData) {
      (location.pathname === '/profile/:username/updatesonginfo') && setFetchedSongData(null)
      (location.pathname === '/profile/:username') && setFetchedSongData(SongData)
    }
    console.log(location.pathname);
    
  }, [SongData, location.pathname]);

  // useEffect(() => {
  //   SongData && setFetchedSongData(SongData)
  // }, [SongData]);

  useEffect(() => {
    console.log('new song data was set', FetchedSongData);
  }, [FetchedSongData]);


  // All Functions

  const setAsMain = async () => {
    id && mainsongdispatch({ type: "SET_SONG", payload: { id, i } });
  };

  const handleEdit = () => {
    navigate("updatesonginfo", {
      state: { SongData, id },
    });
  };

  return (
    //audio player component
    <div
      className={"audioplayer-div-main-song .clickable"}
      onClick={null || onClick}
      style={{ opacity: componentActive ? 1 : 0, ...style }}
    >
      <div className={isLoggedIn ? "ap-div-cover ap-div-cover-admin" : "ap-div-cover"}>
        {FetchedSongData && FetchedSongData.cover && (
          <img
            className="ap-img-cover"
            src={FetchedSongData.cover}
            alt="cover"
            style={{ 
              opacity: componentActive ? 1 : 0, 
              position: isLoggedIn ? 'absolute' : 'relative',
              filter: 'blur(1.5px) brightness(0.4) opacity(0.8)'
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}

        {isLoggedIn ? (
          <>
            <img
              className="ap-img-playpauseicon .clickable"
              src={edit}
              alt="play-pause"
              onClick={handleEdit}
              style={{position: 'relative'}}
            />
            <img
              className="ap-img-playpauseicon .clickable"
              src={play}
              alt="play-pause"
              style={{position: 'relative'}}
              onClick={setAsMain}
            />
          </>

        ) : (
          <img
            className="ap-img-playpauseicon .clickable"
            src={play}
            alt="play-pause"
            // onClick={setAsMain}
          />
        )}
      </div>

      <div className="ap-div-info">
        {FetchedSongData && <h4 className="artist">{FetchedSongData.title}</h4>}
        {FetchedSongData && <p className="name">{FetchedSongData.artists}</p>}
        {/* <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}>
            </div>
          </div> */}
      </div>

      <div className="ap-div-icons">
        <div className="plays">
          <img src={play} alt="play" />
          {FetchedSongData && <p>{FetchedSongData.plays}</p>}
        </div>

        <div className="like-share .clickable">
          {id && (
            <img
              src={share}
              alt="share"
              onClick={() => {
                handleShare("share", "test", "tessst");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
