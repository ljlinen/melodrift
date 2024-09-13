import React, { useEffect, useRef, useState } from "react";
import "./css/mainaudioplayer.css";
import play from "../../asset/img/icon/play.svg";
import pause from "../../asset/img/icon/pause.svg";
import like from "../../asset/img/icon/like.svg";
import backgroundVideo from "../../asset/video/bg.mp4";

import controlsP from "../../asset/img/icon/controlsP.svg";
import controlsN from "../../asset/img/icon/controlsN.svg";
import share from "../../asset/img/icon/share.svg";
import { baseUrl } from "../..";

export default function AudioPlayer({ mainSong }) {
  const [file, setFile] = useState(0);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState();
  const [Expanded, setExpanded] = useState();
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0);
  const [currentAudioId, setCurrentAudioId] = useState();

  useEffect(() => {
    if (!mainSong["SongObj"]) return;

    const name = mainSong["SongObj"]["id"];

    const fetchSongFile = async () => {
      if (!name || !audioRef.current) return;
      setFile(null);
      setIsPlaying(false);
      audioRef.current.pause();
      setFile(baseUrl + "/song/file/" + name); // Reset playback state
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
      setCurrentAudioId(name);
      console.log("vs new song: ", name);
    }; // Clear the current file source

    if (currentAudioId === name) {
      restart(); // Restart the current song
    } else {
      fetchSongFile();

      if (audioRef.current) {
        const audio = audioRef.current;
        audio.ontimeupdate = () => {
          setCurrentTime(audio.currentTime);
          setProgress((audio.currentTime / audio.duration) * 100);
        };
        audio.onloadedmetadata = () => {
          console.log("song loaded");
        };
      }
    }
  }, [mainSong, currentAudioId]);

  const PlayPause = async () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        await audio.pause();
        setIsPlaying(false);
      } else {
        await audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.error("Playback error:", error));
      }
    }
  };

  const restart = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      if (!isPlaying) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.error("Playback error:", error));
      }
    }
  };

  // const handleProgressClick = (e) => {
  //   const width = e.target.clientWidth;
  //   const clickX = e.nativeEvent.offsetX;
  //   const newTime = (clickX / width) * duration;
  //   audioRef.current.currentTime = newTime;
  // };

  return (
    //  audio player component
    mainSong &&
    mainSong["SongData"] && (
      <div
        className="mainaudioplayer-div-main-song"
        onClick={() => {
          setExpanded(!Expanded);
        }}
        style={{
          height: Expanded ? "100%" : "61.33px",
          backgroundColor: Expanded ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, .3)",
          flexDirection: Expanded ? "column" : "unset",
          padding: Expanded ? "30px" : "revert",
        }}
      >
        <audio ref={audioRef}>
          <source src={file} type="audio/mpeg" />
        </audio>

        <div
          className="ap-div-icons"
          style={{
            width: Expanded ? "100%" : "revert",
            background: Expanded
              ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgroundVideo})`
              : "",
            backgroundSize: "cover",
          }}
        >
          <div
            className="like-share"
            style={{
              width: Expanded ? "100%" : "revert",
              flexDirection: Expanded ? "row" : "revert",
              justifyContent: Expanded ? "space-between" : "revert",
              marginTop: Expanded ? "50vh" : "revert",
            }}
          >
            <img src={share} alt="share" />
            <img src={like} alt="like" />
          </div>
        </div>

        <div
          className="ap-div-info"
          style={{
            width: Expanded ? "100%" : "revert",
            height: Expanded ? "fit-content" : "revert",
            paddingBlock: Expanded ? "30px" : "revert",
            justifyContent: Expanded ? "start" : "revert",
            gap: Expanded ? 5 : "revert",
          }}
        >
          <h4 className="artist">{mainSong.SongData.artists}</h4>
          <p className="name">{mainSong.SongData.title}</p>
        </div>

        <div
          className="controls"
          style={{
            height: Expanded ? "fit-content" : "revert",
          }}
        >
          <div className="controls-wrap">
            {file ? (
              <>
                <img
                  alt="previous"
                  className="controls-p icon"
                  src={controlsP}
                />
                <img
                  alt="pause-play"
                  className="controls-pause-play icon"
                  onClick={PlayPause}
                  src={isPlaying ? pause : play}
                />
                <img alt="play" className="controls-n icon" src={controlsN} />
              </>
            ) : (
              <>
                <span className="loader"></span>
              </>
            )}
          </div>
          {file && Expanded ? (
            <div
              className="progress-bar"
              style={{
                marginTop: Expanded ? 20 : "revert",
                opacity: !Expanded ? 0 : 1,
              }}
            >
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          ) : null}
        </div>
      </div>
    )
  );
}
