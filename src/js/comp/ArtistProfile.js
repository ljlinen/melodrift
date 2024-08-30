import React, { useState, useEffect } from 'react'
import './css/artistprofile.css'

import varified from '../../asset/img/icon/verified.svg'
import plays from '../../asset/img/icon/play.svg'
import search from '../../asset/img/icon/search.svg'
import cancel from '../../asset/img/icon/cancel.svg'
import followers from '../../asset/img/icon/followers.svg'
import { useLocation } from 'react-router-dom'
import MusicList from './MusicList'
import ErrorPage from './ErrorPage'
import { baseUrl } from '../..'

export default function ArtistProfile() {

    // const params = useParams();
    const [artistProfileData, setArtistProfileData] = useState();
    const [artistMusicData, setArtistMusicData] = useState();
    const [searching, setSearching] = useState()
    const [error, setErrorMessage] = useState();
    const location = useLocation();
    const { loggedInData } = location.state || {}
    let dataAvailable = false;

    if(loggedInData.hasOwnProperty('username')) {
        dataAvailable = true;
    }

    useEffect(() => {

        if(dataAvailable){
            setArtistProfileData(loggedInData);
            setArtistMusicData(loggedInData['music']['all']);   
        } else {
            fetch(baseUrl + '/account/signup/available', {
                method: 'PUT',
                body: JSON.stringify(loggedInData),
                headers: {
                    'Content-Type': 'application/json',
                }    
            }).then((response) => {
                if(response.status === 200) {
                    return response.json()
                }
            }).then((result) => {
                if(result.hasOwnProperty('username')) {
                    setArtistProfileData(result);
                    if(result.hasOwnProperty('music')) {
                        // setArtistMusicData(result.music.all);
                    }
                    
                } else {
                    setErrorMessage('Error getting profile')
                }
            }).catch((err) => {
                setErrorMessage(error)
                throw err
            })
        }


    }, [dataAvailable, loggedInData, error])

    if(!artistProfileData) {
        return (
            <ErrorPage errorMessage={error} />
        )
    }

  return (
    <div className="profile-div-main-artist">
    <div className='wrap-info-about'>

        <nav>
            <p>Melodrift</p>
            <div className='nav-div-search'>
                <input style={{display: searching ? 'unset' : 'none'}} onFocus={() => setSearching(true)} className='input-search' type='text' />
                <div className={searching ?'search-div-result-list slideDown' : 'search-div-result-list'}>
                    {
                    searching ?
                    <p>searching</p>
                    : 
                    <p>not searching</p>
                    }
                </div>
                <img  onClick={() => setSearching(!searching)} className='i nav-img-search' src={searching ? cancel : search} alt='search' />                
            </div>
        </nav>

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

            <div className="about">
                <input type='button' value='play all' />
            </div>

            <div className='background'>
                <div className='background-color' />
                <div className='background-color-two' />
                <img  alt='background' src={artistProfileData.cover} />
            </div>
        </div>

        {/* <MusicList MusicListData={artistMusicData} listTitle={'pinned song'} /> */}
        <MusicList MusicListData={artistMusicData} listTitle={'all music'}/>
    </div>
  )
}
