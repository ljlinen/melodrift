import React, { useEffect, useState } from "react";
import "../comp/css/artistprofile.css";

import edit from "../../asset/img/icon/edit.svg";
import plays from "../../asset/img/icon/play.svg";
import like from "../../asset/img/icon/like.svg";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import MusicList from "../comp/MusicList";
import MainAudioPlayer from "../comp/MainAudioPlayer";
import useArtistMusicListContext from "../hooks/useArtistMusicListContext";
import useLoginContext from "../hooks/useLoginContext";
import { baseFetch, onSkip } from "../..";
import useMainSongContext from "../hooks/useMainSongContext";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import useFetchCoverFile from "../hooks/useFetchCoverFile";

export default function ArtistProfileAdmin() {
  const navigate = useNavigate()
  const params = useParams();
  const isLoggedIn = useIsLoggedIn()

  const { userLogin, dispatch } = useLoginContext()

  const { artistmusiclist, pinnedsong, musiclistdispatch } = useArtistMusicListContext();
  const { mainsong, mainsongdispatch } = useMainSongContext()

  const [artistProfileData, setArtistProfileData] = useState();
  const cover = useFetchCoverFile(artistProfileData?.cover);
  // const [searching, setSearching] = useState();
  // const [error, setErrorMessage] = useState();
  const [pageActive, setPageActive] = useState(true);
  const [username, setUsername] = useState();

  // useFetchSongData(mainSongAdmin['i'])

  // const [dialog, setDialog] = useState({

  //         heading: undefined,
  //         message: undefined,

  //         negative: {
  //         value: undefined,
  //         callback: undefined
  //         },

  //         positive: {
  //         value: undefined,
  //         callback: undefined,
  //         }
  // })

  useEffect(() => {
    setPageActive(true);
    
    const fetchProfile = async() => {
      console.log('did run again');
      

      try{
        const responseObject = await baseFetch({
            route: '/artist/' + username,
            method: 'GET',
        })
        
        if(responseObject["success"] && responseObject['data']) {
          const userObject = JSON.parse(responseObject['data'])
          if(userObject['username'])
            setPageActive(true);
            setArtistProfileData(userObject);
            const array = []
            userObject['music']['all'].forEach((item, i) => {
              array.push({...item, 'key': `pos-${i}-ref-`})
            })
            musiclistdispatch({type: 'SET_LIST', payload: array })
        }
              
      } catch(error) {
          // implement error page for not found artist etc
          console.log(error); 
      }
    }

    !params.username ? navigate('/login') : fetchProfile()

    console.log('udeeffect saw that it changed', params.username);
      // eslint-disable-next-line
  }, [params.username]);

  useEffect(() => {
    artistmusiclist && console.log('context musi list:', artistmusiclist);
    
      // eslint-disable-next-line
  }, [artistmusiclist]);

  useEffect(() => {
    if(userLogin && !username) {
      setArtistProfileData(userLogin);
      setUsername(userLogin["username"]);
      mainsongdispatch({ type: 'SET_SONG', payload: userLogin["username"]});
      console.log('music list setting was', userLogin["music"]["all"]);
      const array = []
      userLogin['music']['all'].forEach((item, i) => {
        array.push({...item, 'key': `pos-${i}-ref-`})
      })
      musiclistdispatch({ type: 'SET_LIST', payload: array});
    } else if(!userLogin && username) {
      navigate('/profile/' + username)
    } else {
      navigate('/login')
    }
      // eslint-disable-next-line
  }, [userLogin]);

  const onSkipLocal = (nextORprevious) => {
    onSkip(mainsong['i'], mainsongdispatch, artistmusiclist.length, nextORprevious)
  }

  const Logout = () => {
    mainsongdispatch({type: 'CLEAR_SONG'})
    musiclistdispatch({type: 'CLEAR_CONTEXT'})
    dispatch({type: 'LOGOUT'})
  }


  // JSX
  return (
    artistProfileData && (<div className="profile-div-main-artist" onScroll={(e) => {console.log(e.target.style.scrollY)}}>
          {/* {<Dialog 
        heading={dialog.heading}
        message={dialog.message}
        negative={dialog.negative}
        positive={dialog.positive}
        />} */}

          {
            artistProfileData && 
            (<div
              className="wrap-info-about"
              style={{ opacity: pageActive ? 1 : 0 }}>

              <nav>
                <div className="space-between">
                  <h3 className="logo">Melodrift</h3>
                  {
                    isLoggedIn ? 
                    <input className="default-button" type="button" value='logout' onClick={Logout} />
                    :
                    <input className="default-button" type="button" value='login or signup' onClick={() => navigate('/login')} />
                  }
                </div>
                {/* <div className="nav-div-search">
                  <input
                    style={{ display: searching ? "unset" : "none" }}
                    onFocus={() => setSearching(true)}
                    className="input-search"
                    type="text"
                  />
                  <div
                    className={
                      searching
                        ? "search-div-result-list slideDown"
                        : "search-div-result-list"
                    }>
                    {searching ? <p>searching</p> : <p>not searching</p>}
                  </div>
                  <img
                    onClick={() => setSearching(!searching)}
                    className="i nav-img-search"
                    src={searching ? cancel : search}
                    alt="search"
                  />
                </div> */}
              </nav>

              <div className="wrap-info-stats">
                <div className="info">
                  <div className="wrap-name-varified">
                    <h1 className="name">{artistProfileData.name}</h1>
                    <img className="icon" src={edit} alt="edit" />
                  </div>
                  <p className="location">{artistProfileData.location}</p>
                </div>

                <div className="stats">
                  <div>
                    <img className="icon" src={like} alt="likes" />
                    <p>{artistProfileData.likes}</p>
                  </div>

                  <div>
                    <img className="icon" src={plays} alt="plays" />
                    <p>{artistProfileData.plays}</p>
                  </div>
                </div>
              </div>

              <div className="about">
                <input className="default-button" type="button" value="play all" onClick={() => mainsongdispatch({type: 'SET_SONG', payload: {i: 0}})} />
              </div>

              <div className="background">
                <div className="background-color" />
                <div className="background-color-two" />
                <img
                  alt="background"
                  src={cover ?? null}
                  style={{ opacity: artistProfileData.cover ? 1 : 0 }}
                  onError={(e) => {e.target.style.display = 'none'}}
                />
              </div>
            </div>)
          }

          {
            pinnedsong ?
            <MusicList 
              MusicListData={pinnedsong} 
              listTitle={'pinned song'}
              errorMessage='No song is pinned.'
              style={{ opacity: pageActive ? 1 : 0, paddingBottom: 'unset'}}
            />
            :
            null
          }
          <MusicList
            MusicListData={artistmusiclist}
            listTitle={"all music"}
            errorMessage='No music available. Upload!'
            admin={isLoggedIn}
            style={{ opacity: pageActive ? 1 : 0 }}
            childStyle={{overflowY: 'scroll'}}
          />

          <Outlet />

          {
            mainsong && artistmusiclist &&
            (
              <MainAudioPlayer 
              id={artistmusiclist[mainsong?.i]?.id}
              onSkip={onSkipLocal} 
              />
            )
            
          }

        </div>
    )
  );
}
