import React, { useEffect, useState } from 'react'
import AudioPlayer from './AudioPlayer'
import './css/musiclist.css'
import upload from '../../asset/img/icon/upload.svg'
import { Link } from 'react-router-dom'


export default function MusicList( { MusicListData, listTitle, admin } ) {

  const [pageActive, setPageActive] = useState(false)

  useEffect(() => {
    setPageActive(true)

    return () => {
      setPageActive(false)
    }
  }, [MusicListData])

  return (
    <div className='music-list-div-main' style={{ opacity: pageActive ? 1 : 0 }}>
      {MusicListData && (
        <div className="component-MusicListData">
          <h3>{listTitle}</h3>
          {admin && console.log(typeof MusicListData)}
          
          {MusicListData.length > 0 ? (
            MusicListData.map((item, i) => (
              <AudioPlayer key={i} i={i} SongObj={item} />
            ))
          ) : (
            <p>No music available.</p>
          )}

          {admin && (
            <Link to={{ pathname: '/profile/upload' }}
              style={{
                padding: '7.33px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: MusicListData.length > 0 ? '61.33px' : '30.33px',
                width: '100%',
                borderRadius: '5.83px',
                border: '0.67px solid rgba(var(--clr-main), 0.1)',
                overflow: 'hidden',
                alignItems: 'center',
                marginBlock: '24px 10px',
                backgroundColor: 'rgba(var(--clr-main), 0.06)',
                gap: 6
              }}
            >
              <img className='icon' src={upload} alt='upload' />
              <p style={{opacity: .5}}>{MusicListData.length > 0 ? 'Upload more music' : 'Upload music'}</p>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
