import React, { useEffect, useRef, useState } from 'react'
import './css/audioplayer.css'
import play from '../../asset/img/icon/play.svg'
import pause from '../../asset/img/icon/pause.svg'
import like from '../../asset/img/icon/like.svg'
import share from '../../asset/img/icon/share.svg'

export default function AudioPlayer( { SongData }) {
   console.log(SongData);
   
   const audioRef = useRef(null);
   const [isPlaying, setIsPlaying] = useState(false);
   const [progress, setProgress] = useState(0);
   const [currentTime, setCurrentTime] = useState(0);
   const [duration, setDuration] = useState(0);

   console.log(currentTime);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const loadMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', loadMetadata);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', loadMetadata);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const startSong = () => {
   audioRef.current.currentTime = 0;
   setIsPlaying(true);
 };

  const handleProgressClick = (e) => {
    const width = e.target.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const newTime = (clickX / width) * duration; 
    audioRef.current.currentTime = newTime;
  };



  return (
    //  audio player component
    <div className="audioplayer-div-main-song">
      <audio   ref={audioRef}>
         <source src={ SongData.audio } type="audio/mpeg" />
      </audio>
       <div onClick={togglePlayPause} className="ap-div-cover">
          <img className="ap-img-cover" src={ SongData.cover } alt="cover" />
          <img className="ap-img-playpauseicon" src={ isPlaying ? pause : play } alt="play-pause" />
       </div>

       <div  onClick={startSong} className="ap-div-info">
          <h4 className="artist">{ SongData.artist }</h4>
          <p className="name">{ SongData.title }</p>
          <div className="progress-bar" onClick={handleProgressClick}>
            <div className="progress" style={{ width: `${progress}%` }}>
            </div>
          </div>
       </div>

       <div className='ap-div-icons'>
        <div className='plays'>
          <img src={play} />
          <p>{ SongData.likes }</p>
        </div>

        <div className='like-share'>
          <img src={share} />
          <img src={like} />
        </div>
       </div>
    </div>
  )
}
