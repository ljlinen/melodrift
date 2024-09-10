import React, { useContext, useEffect, useState } from 'react'
import './css/audioplayer.css'
import play from '../../asset/img/icon/play.svg'
import like from '../../asset/img/icon/like.svg'
import share from '../../asset/img/icon/share.svg'
import { baseFetch } from '../..'
import { ProfileContext } from './ArtistProfile'
import { ProfileContextAdmin } from './ArtistProfileAdmin'

export default function AudioPlayer( { SongObj }) {


  const [SongData, setSongData] = useState();
  const { setMainSong } = useContext(ProfileContext) || {}
  const { setMainSongAdmin } = useContext(ProfileContextAdmin) || {}
  const setAsMain = async() => {

    if(SongObj) {
      if(setMainSong) {
        setMainSong((prev) => ({
          SongData,
          SongObj
        }))
      } else {
        setMainSongAdmin((prev) => ({
          SongData,
          SongObj
        }))
      }
    }
  }

  useEffect(() => {

    const fetchSong = async() => {
      console.log('SongObj', SongObj);
      const name = SongObj['id']
  
      try{
        const audioObject = await baseFetch({
            route: '/song/' + name,
            method: 'GET',
        })
        console.log('audioObject', audioObject);
        
        if(audioObject && audioObject['data']) {
          setSongData(audioObject['data']);
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

    fetchSong();

  }, [SongObj])


return (
    //  audio player component
    SongData && <div 
      className="audioplayer-div-main-song"
      onClick={setAsMain}
      >
       <div className="ap-div-cover">
          <img className="ap-img-cover" src={ SongData.cover } alt="cover" />
          {/* <img className="ap-img-playpauseicon" src={ isPlaying ? pause : play } alt="play-pause" /> */}
       </div>

       <div className="ap-div-info">
          <h4 className="artist">{ SongData.artists }</h4>
          <p className="name">{ SongData.title }</p>
          {/* <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}>
            </div>
          </div> */}
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