import React, { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import "./css/musiclist.css";
import upload from "../../asset/img/icon/upload.svg";
import { useNavigate } from "react-router-dom";

export default function MusicList({MusicListData, listTitle, errorMessage, admin, audioPlayerStyle, childStyle, style, columnOrRow,
}) {
  /**
   * @param MusicListData array. format [{id: 'songid'}]
   */
  
  const [pageActive, setPageActive] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    console.log('type of data music list is given', MusicListData);
}, [MusicListData]);

  // Functons

  return (
    <div className="music-list-div-main" style={{...style, paddingInline: !columnOrRow ? '20px' : null}}>
        <div className="component-MusicListData">
          <h3 style={{opacity: listTitle.includes('false') ? 0 : 1}}>{listTitle.includes('false') ? '...' : listTitle}</h3>
          <div style={{
                width: "100%",
                overflowX: "auto",
                scrollBehavior: "smooth",
                ...childStyle
          }}>
            <div className={`audioplayers-wrap ${columnOrRow ? columnOrRow : 'column'}`}>
              {MusicListData && MusicListData.length > 0 ? (
                MusicListData.map((item, i) => (
                  <AudioPlayer
                    refresh={item?.refresh && item.refresh}
                    i={i}
                    id={item["id"]}
                    item={item}
                    style={audioPlayerStyle}
                    // updateKey={updateKey}
                    key={i}
                  />
                ))
              ) : (
                <p className="note-p" style={{opacity: pageActive ? 1 : 0}}>{errorMessage}</p>
              )}
            </div>
          </div>

          {admin && (
            <div
              className="upload-link"
              onClick={() => {
                navigate("upload");
                setPageActive(false);
              }}
            >
              <img className="icon" src={upload} alt="upload" />
              <h5>
                {MusicListData.length > 0 ? "Upload More" : "Upload music"}
              </h5>
            </div>
          )}
        </div>
    </div>
  );
}
