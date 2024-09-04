import React, { useEffect, useRef, useState } from 'react'
import './css/audioplayer.css'
import play from '../../asset/img/icon/play.svg'
import pause from '../../asset/img/icon/pause.svg'
import like from '../../asset/img/icon/like.svg'
import share from '../../asset/img/icon/share.svg'
import { baseUrl } from '../..'

export default function AudioPlayer( { SongInfo, i}) {
   
   const [SongData, setSongData] = useState()
   const audioRef = useRef(null);
   const [isPlaying, setIsPlaying] = useState(false);
   const [progress, setProgress] = useState(0);
   const [currentTime, setCurrentTime] = useState(0);
   const [duration, setDuration] = useState(0);

  useEffect(() => {

    fetch(baseUrl + '/song/' + SongInfo[i + 1])
      .then((res) => { 
        if(res.ok) {
          return res.json()
        } else {
          throw res.json()
        }
      })
      .then((res) => {
        if(res['success'] === true && res['data']) {
          const base64Audio = res.data.file
          res.data['file'] = `data:audio/mp3;base64,${base64Audio}`;
          setSongData(res.data)
        } else {
          throw res['message']
        }
      })
      .catch((err) => {
        console.log(err);
      })

      console.log(SongData);


  if(audioRef.current) { 
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
  }

    // return () => {
    //   if(audioRef.current) {
    //     const audio = audioRef.current;
    //     audio.removeEventListener('timeupdate', updateProgress)
    //     audio.removeEventListener('loadedmetadata', loadMetadata);
    //   }

    // };
  }, [SongInfo, SongData, i]);

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
  console.log(currentTime);
  
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
    SongData && <div className="audioplayer-div-main-song">
      <audio   ref={audioRef}>
         <source src={ SongData.file } type="audio/mpeg" />
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
          <img src={play} alt='play' />
          <p>{ SongData.likes }</p>
        </div>

        <div className='like-share'>
          <img src={share} alt='share' />
          <img src={like} alt='like' />
        </div>
       </div>
    </div>
  )
}
