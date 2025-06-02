import React, { useEffect, useRef, useState } from "react";
import { handleShare, updateSong } from "../../main";

import "../../css/component/mainaudioplayer.css";
import IconPlay from "../../asset/icon/play.svg";
import IconPause from "../../asset/icon/pause.svg";
import IconLike from "../../asset/icon/like.svg";
import IconLiked from "../../asset/icon/liked.svg";
import backgroundVideo from "../../asset/video/bg.mp4";

import IconControlsP from "../../asset/icon/controlsP.svg";
import IconControlsN from "../../asset/icon/controlsN.svg";
import IconShare from "../../asset/icon/share.svg";
import IconUp from "../../asset/icon/up.svg";
import useFetchSongData from "../hooks/useFetchSongData";
import useFetchSongFile from "../hooks/useFetchSongFile";

export default function MainAudioPlayer({ id, onSkip, Expand }) {

  const audioRef = useRef(null);
  const backgroundVideoReff = useRef(null);
  const [isPlaying, setIsPlaying] = useState();
  const [isLiked, setLiked] = useState(false);
  const [Expanded, setExpanded] = useState(Expand);
  const [progress, setProgress] = useState(0);
  // eslint-disable-next-line
  const [currentTime, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0);

  const { SongData } = useFetchSongData(id)
  const { file } = useFetchSongFile(id);

  useEffect(() => {
    console.log('id is: ', id);
    file && PlayPause();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {


    if (file && audioRef.current) {
      const audio = audioRef.current;
      audio.load();
      audio.onended = () => {
        onSkip('next')
        PlayPause()
      };
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      };
      audio.onloadedmetadata = () => {
        console.log("song loaded");
        PlayPause();
        SongData && updateSong(SongData['publisher'], 'plays', id)
      };
    }


    // eslint-disable-next-line
  }, [file]);

  const PlayPause = async () => {
    console.log('trying to play');

    const audio = audioRef.current;
    const video = backgroundVideoReff.current;
    if (audio) {
      if (isPlaying) {
        await audio.pause();
        await video.pause();
        setIsPlaying(false);
      } else {
        console.log('trying to play play play');
        await audio
          .play()
          .then(() => {
            console.log('should be playing');
            setIsPlaying(true)
          })
          .catch((error) => {
            console.log('never played');
            console.error("Playback error:", error)
            setIsPlaying(false)
          });
        await video
          .play()
          .catch((error) => {
            console.error("Video Playback error:", error)
          });
      }
    }
  };

  // const restart = () => {
  //   const audio = audioRef.current;
  //   if (audio) {
  //     audio.currentTime = 0;
  //     if (!isPlaying) {
  //       audio
  //         .play()
  //         .then(() => setIsPlaying(true))
  //         .catch((error) => console.error("Playback error:", error));
  //     }
  //   }
  // };

  // const handleProgressClick = (e) => {
  //   const width = e.target.clientWidth;
  //   const clickX = e.nativeEvent.offsetX;
  //   const newTime = (clickX / width) * duration;
  //   audioRef.current.currentTime = newTime;
  // };

  return (
    //  audio player component
    (id && SongData) ? (
      <div
        className={Expanded ? 'mainaudioplayer-div-main-song mainaudioplayer-div-main-song-alt' : 'mainaudioplayer-div-main-song'}>
        <IconUp className="expand-collaps-icon" alt="expand or collaps"
          style={{
            transform: Expanded ? 'rotate(180deg)' : 'revert',
            marginBottom: Expanded ? 10 : 'revert'
          }}
          onClick={() => {
            setExpanded(!Expanded);
          }} />
        <audio ref={audioRef}>
          <source src={file} type="audio/mpeg" />
        </audio>

        <div
          className="ap-div-icons"
          style={{
            width: Expanded ? "100%" : "revert",
            paddingBottom: Expanded ? 10 : 'revert'
          }}>
          <video ref={backgroundVideoReff}
            autoPlay
            muted
            loop
            className="background-video"
            style={{ display: Expanded ? "unset" : "none" }}
            onLoadedMetadata={() => backgroundVideoReff.current.playbackRate = '.5'}>

            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <div className={`like-share ${Expanded ? 'like-share-alt' : ''}`}>
            {
              id ?
                (<>
                  <IconShare
                    onClick={() => {
                      handleShare(
                        `Listen to ${SongData['publisher']} on Melodrift.`,
                        ``,
                        'www.melodrift.pages.dev/song/' + id)
                    }}
                  />
                  {
                    isLiked ?
                    <IconLiked 
                      onClick={async () => {
                        if (isLiked) return;
                        const liked = await updateSong(SongData['publisher'], 'likes', id)
                        setLiked(liked);
                      }} /> :
                      <IconLike
                      onClick={async () => {
                        if (isLiked) return;
                        const liked = await updateSong(SongData['publisher'], 'likes', id)
                        setLiked(liked);
                      }} />
                  }
                </>) :
                null
            }
          </div>
        </div>

        <div className={`ap-div-info ${Expanded ? 'ap-div-info-alt' : ''}`}>
          <h4 className="artist">{SongData.artists}</h4>
          <p className="name">{SongData.title}</p>
        </div>

        <div className={Expanded ? 'controls controls-alt' : 'controls'}>
          <div className="controls-wrap">
            {file ? (
              <>
                <IconControlsP
                  className="controls-p icon .clickable"
                  onClick={() => { onSkip('previous') }}
                />
                {
                  isPlaying ?
                  <IconPause className="controls-pause-play icon .clickable" onClick={PlayPause} /> :
                  <IconPlay className="controls-pause-play icon .clickable" onClick={PlayPause} />
                }
                <IconControlsN
                  className="controls-n icon .clickable"
                  onClick={() => { onSkip('next') }}
                />
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
              <div className="progress" style={{ width: `${progress}%`, backgroundColor: 'white' }}>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    ) : null
  );
}
