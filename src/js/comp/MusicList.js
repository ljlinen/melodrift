import React from 'react'
import AudioPlayer from './AudioPlayer'
import './css/musiclist.css'


export default function MusicList( { MusicListData, listTitle} ) {

  if(!MusicListData) {
    return
  }

  const songs = MusicListData;

  return (
    <div className='music-list-div-main'>         
      <div className="component-songs">
        <h3>  { listTitle } </h3>
        
        {songs.map((item, i) => {
          console.log(songs[i]);
          
          return <AudioPlayer key={i} SongData={songs[i]} />
        })}

      </div>
    </div>
  )
}
