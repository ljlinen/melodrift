import React, { useEffect, useRef, useState } from 'react'
import './css/mainaudioplayer.css'
import play from '../../asset/img/icon/play.svg'
import pause from '../../asset/img/icon/pause.svg'
import like from '../../asset/img/icon/like.svg'

import controlsP from '../../asset/img/icon/controlsP.svg'
import controlsN from '../../asset/img/icon/controlsN.svg'
import share from '../../asset/img/icon/share.svg'
import { baseFetch } from '../..'

export default function AudioPlayer({ mainSong }) {

  const [file, setFile] = useState(0);
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false);
  // const [progress, setProgress] = useState(0);
  // const [currentTime, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0);
  const [currentAudioId, setCurrentAudioId] = useState()

  useEffect(() => {

  const fetchSongFile = async() => {

    const name = mainSong['SongObj']['id'];

    if(currentAudioId === name) {
      return null
    }

    try{
      const audioFileObj = await baseFetch({
          route: '/song/file/' + name,
          method: 'GET',
      })
      
      if(audioFileObj['data']) {
        const base64Audio = `data:audio/mp3;base64,${audioFileObj['data']}`;
        setFile(base64Audio)
        setCurrentAudioId(name);
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

  if(mainSong['SongData']) {
    fetchSongFile();
    file && restart()
  }
    

    
  // if(audioRef.current) { 
  //   const audio = audioRef.current;

  //   // const updateProgress = () => {
  //   //   setCurrentTime(audio.currentTime);
  //   //   setProgress((audio.currentTime / audio.duration) * 100);
  //   // };

  //   // const loadMetadata = () => {
  //   //   setDuration(audio.duration);
  //   // };

  //   // audio.addEventListener('timeupdate', updateProgress);
  //   // audio.addEventListener('loadedmetadata', loadMetadata);
  // }

    return () => {
    //   if(audioRef.current) {
    //     const audio = audioRef.current;
    //     audio.removeEventListener('timeupdate', updateProgress)
    //     audio.removeEventListener('loadedmetadata', loadMetadata);
    //   }

      // if(file) {
      //   setFile(undefined)
      // }
    };

  }, [mainSong, file, currentAudioId]);


  const PlayPause = () => {
    const audio = audioRef.current

    if(isPlaying) {
      audio.pause()
      setIsPlaying(false);
    } else {
      audio.play()
      setIsPlaying(true);
    };
  }

  const restart = () => {
    audioRef.current.currentTime = 0;
    setIsPlaying(true);
  };

  // const handleProgressClick = (e) => {
  //   const width = e.target.clientWidth;
  //   const clickX = e.nativeEvent.offsetX;
  //   const newTime = (clickX / width) * duration; 
  //   audioRef.current.currentTime = newTime;
  // };


  return (
    //  audio player component
    mainSong && mainSong['SongData'] && <div className="mainaudioplayer-div-main-song">
       {
        file ? (<audio   ref={audioRef} onPause={() => {setIsPlaying(false)}}>
          <source src={ file } type="audio/mpeg" />
        </audio>) : null
       }

      <div className='ap-div-icons'>
        <div className='like-share'>
          <img src={share} alt='share' />
          <img src={like} alt='like' />
        </div>
       </div>

       <div className="ap-div-info">
          <h4 className="artist">{ mainSong.SongData.artists }</h4>
          <p className="name">{ mainSong.SongData.title }</p>
       </div>

       <div className='controls'>
        <div className='controls-wrap'>
          <img alt='previous' className='controls-p icon' src={controlsP} />
          <img alt='pause-play' className='controls-pause-play icon' onClick={PlayPause} src={ isPlaying ? pause : play } />
          <img alt='play' className='controls-n icon' src={controlsN} />
        </div>
        {/* <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}>
            </div>
        </div> */}
       </div>
    </div>
  )
}