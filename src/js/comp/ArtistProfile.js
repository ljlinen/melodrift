import React from 'react'
import './css/artistprofile.css'
import varified from '../../asset/img/icon/verified.svg'
import plays from '../../asset/img/icon/play.svg'
import search from '../../asset/img/icon/search.svg'
import followers from '../../asset/img/icon/followers.svg'
// import { useParams } from 'react-router-dom'
import MusicList from './MusicList'
import { profileData } from '../..'

export default function ArtistProfile() {

    const artistProfileData = profileData
    const artistMusicData = profileData.music.all;

    // const backendUrl = 'https://a9e7282d-ca17-46e2-b218-fdc87b0bc12d-00-3iuxzll2fs6qt.kirk.replit.dev/artist/'
    // const params = useParams();
    // const [artistProfileData, setArtistProfileData] = useState();
    // const [artistMusicData, setArtistMusicData] = useState();
    // const [error, setError] = useState();
    

    // useEffect(() => {
    //     fetch(backendUrl + params.username)
    //     .then((resp) => {
    //         if (resp.status === 404) {
    //             console.log('responded with 404');
    //             return resp.text()
    //         } else if (resp.status === 200) {
    //             console.log('responded with 200');
    //             return resp.json();
    //         }
    //     })
    //     .then((res) => {
    //         if(typeof res == 'string') {
    //             console.log('parsed response: ', res);
    //         } else {
    //             setArtistProfileData(res);
    //             setArtistMusicData(res.music.all);            
    //         }

    //         console.log(res);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         setError('Error fetching artist data: ' + err.toString());
    //     });

    // }, [params.username])

    // if(!artistProfileData) {
    //     return (
    //         <div className="profile-div-main-artist">
    //             <p> {error} </p>
    //         </div>
    //     )
    // }

  return (
    <div className="profile-div-main-artist">
    <div className='wrap-info-about'>

        <nav>
            <p>Melodrift</p>
            <img className='i' src={search} alt='search' />
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
                <img  alt='background' src={profileData.cover} />
            </div>
        </div>

        <MusicList MusicListData={[artistMusicData[0]]} listTitle={'pinned song'} />
        {/* <MusicList MusicListData={artistMusicData} listTitle={'all music'}/> */}
    </div>
  )
}
