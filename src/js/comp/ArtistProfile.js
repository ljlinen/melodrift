import React, { useEffect, useState } from 'react'
import './css/artistprofile.css'
import varified from '../../asset/img/icon/verified.svg'
import plays from '../../asset/img/icon/play.svg'
import followers from '../../asset/img/icon/followers.svg'
import { useParams } from 'react-router-dom'
import MusicList from './MusicList'

export default function ArtistProfile() {

    const backendUrl = 'https://a9e7282d-ca17-46e2-b218-fdc87b0bc12d-00-3iuxzll2fs6qt.kirk.replit.dev/artist/'
    const params = useParams();
    const [artistProfileData, setArtistProfileData] = useState();
    const [artistMusicData, setArtistMusicData] = useState();
    const [error, setError] = useState();
    

    useEffect(() => {
        fetch(backendUrl + params.username)
        .then((resp) => {
            if (resp.status === 404) {
                console.log('responded with 404');
                return resp.text()
            } else if (resp.status === 200) {
                console.log('responded with 200');
                return resp.json();
            }
        })
        .then((res) => {
            if(typeof res == 'string') {
                console.log('parsed response: ', res);
            } else {
                setArtistProfileData(res);
                setArtistMusicData(res.music.all);            
            }

            console.log(res);
        })
        .catch((err) => {
            console.log(err);
            setError('Error fetching artist data: ' + err.toString());
        });

    }, [params.username])

    if(!artistProfileData) {
        return (
            <div className="profile-div-main-artist">
                <p> {error} </p>
            </div>
        )
    }

  return (
    <div className="profile-div-main-artist">
        <div className="profile-image">
            <img src={ artistProfileData.cover } alt='profile' />
        </div>
        
    <div className='wrap-info-about'>
        <div className="wrap-info-stats">
                <div className="info">
                    <div className="wrap-name-varified">
                    <h1 className="name">{ artistProfileData.name }</h1>
                    <img className="icon" src={varified} alt='verified'/>
                    </div>
                    <h2 className="location">{ artistProfileData.location }</h2>
                </div>
                
                <div className="stats">
                        <div>
                            <img className="icon" src={followers} alt='followers'/>
                            <p>{ artistProfileData.likes }</p>
                        </div>

                        <div>
                            <img className='icon' src={plays} alt='plays'/>
                            <p>{ artistProfileData.plays }</p>
                        </div>
                </div>
            </div>

            <h3>About</h3>
            <p className="about">{ artistProfileData.about }</p>
        </div>

        <MusicList MusicListData={[artistMusicData[0]]} listTitle={'pinned song'} />
        <MusicList MusicListData={artistMusicData} listTitle={'all music'}/>

    </div>
  )
}
