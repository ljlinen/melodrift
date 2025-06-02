import React, { useEffect } from "react";
import "../../css/component/audioplayer.css";
import IconPlay from "../../asset/icon/play.svg";
import IconShare from "../../asset/icon/share.svg";
import { formatToK, handleShare } from "../../main";
import IconEdit from "../../asset/icon/edit.svg";
import { useNavigate } from "react-router-dom";
import useFetchSongData from "../hooks/useFetchSongData";
import useMainSongContext from "../hooks/useMainSongContext";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import useFetchCoverFile from "../hooks/useFetchCoverFile";
// eslint-disable-next-line
export default function AudioPlayer({ id, i, style, onClick, refresh, updateKey }) {
  const { SongData, componentActive } = useFetchSongData(id);
  const cover = useFetchCoverFile(SongData?.cover);
  const { mainsongdispatch } = useMainSongContext();
  const isLoggedIn = useIsLoggedIn()

  const navigate = useNavigate();


  useEffect(() => {
    console.log('should refresh ', refresh);
    refresh && updateKey(id)
    // eslint-disable-next-line
  }, [refresh]);

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
      onClick={onClick ?? null}
      style={{ opacity: componentActive ? 1 : 0, ...style }}
    >
      <div className={isLoggedIn ? "ap-div-cover ap-div-cover-admin" : "ap-div-cover"}>
        {SongData && cover && (
          <img
            className="ap-img-cover"
            src={cover ?? null}
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
            <IconEdit
              className="ap-img-playpauseicon .clickable"
              onClick={handleEdit}
              style={{ position: 'relative' }}
            />
            <IconPlay
              className="ap-img-playpauseicon .clickable"
              style={{ position: 'relative' }}
              onClick={setAsMain}
            />
          </>

        ) : (
          <IconPlay
            className="ap-img-playpauseicon .clickable"
            onClick={setAsMain}
          />
        )}
      </div>

      <div className="ap-div-info">
        {SongData && <h4 className="artist">{SongData.title}</h4>}
        {SongData && <p className="name">{SongData.artists}</p>}
        {/* <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}>
            </div>
          </div> */}
      </div>

      <div className="ap-div-icons">
        <div className="plays">
          <IconPlay />
          {SongData && <p>{formatToK(SongData.plays)}</p>}
        </div>

        <div className="like-share .clickable">
          {
            id ?
              (
                <IconShare
                  onClick={() => {
                    handleShare("share", "test", "tessst");
                  }}
                />
              ) : null
          }
        </div>
      </div>
    </div>
  );
}
