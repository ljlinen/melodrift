import React, { useEffect, useState } from "react";
import "../comp/css/homepage.css";
import MusicList from "../comp/MusicList";
import { baseFetch, onSkip } from "../..";
import LabelListGrid from "../comp/LabelListGrid";
import { useNavigate, useParams } from "react-router-dom";
import MainAudioPlayer from "../comp/MainAudioPlayer";
import useArtistMusicListContext from "../hooks/useArtistMusicListContext";
import useMainSongContext from "../hooks/useMainSongContext";
import useLoginContext from "../hooks/useLoginContext";
import useIsLoggedIn from "../hooks/useIsLoggedIn";

export default function HomePage() {
  // const visible = usePageActive('/')
  const { artistmusiclist, musiclistdispatch } = useArtistMusicListContext();
  const { mainsong, mainsongdispatch } = useMainSongContext()
  const { userLogin, dispatch } = useLoginContext();
  const isLoggedIn = useIsLoggedIn();


  const [chart, setChart] = useState("new-music/all-genres");
  const [chartName, setChartName] = useState("new-music/all-genres");
  // eslint-disable-next-line
  const [expand, setExpand] = useState(false);

  // const artistMusicData = useFechSongByParams();
  const params = useParams();
  const navigate = useNavigate()

  const labelsArray = ["all-genres","hip-hop","amapiano","private piano","house","deep house","soul","pop","other"];
  // eslint-disable-next-line
  const labelsArraySecond = ["all-genres","hip-hop","amapiano","private piano","house","deep house","soul","pop","other"];


  useEffect(() => {
    mainsongdispatch({ type: 'SET_SONG', payload: { id: params.songid, i: 0 }});
      // eslint-disable-next-line
  }, [params.songid]);

  useEffect(() => {
      console.log('music list context from homepage: ', artistmusiclist);
      // eslint-disable-next-line
  }, [artistmusiclist])

  useEffect(() => {

    (async () => {
      
      try {
        const responseObject = await baseFetch({
          route: "/global/" + chart,
          method: "GET",
        });

        if(responseObject["data"]) {
          const responseList = responseObject['data']
          const newList = responseList.map((item, i) => item = {id: item, key: `pos-${i}-ref-`})
          if(mainsong?.id) {
            responseList.splice(0, 1, { id: mainsong.id })
            setExpand(true)
          }
          musiclistdispatch({ type: 'SET_LIST', payload: newList});
        } else {
          musiclistdispatch({ type: 'SET_LIST', payload: []});
        }
      } catch (error) {
        console.log(error);
      }
    })();
  // eslint-disable-next-line
  }, [chart, mainsong?.id]);


  // Component Specific Functions
  const setChartHandler = async(genre) => {
    console.log(genre);
    setChart("plays/" + genre.toLowerCase());
    setChartName(false)
    setTimeout(() => {
      setChartName(genre)
    }, 500)
  };

  const onSkipLocal = (nextORprevious) => {
    onSkip(mainsong['i'], mainsongdispatch, artistmusiclist.length, nextORprevious)
  }

  const Logout = () => {
    mainsongdispatch({type: 'CLEAR_SONG'})
    musiclistdispatch({type: 'CLEAR_CONTEXT'})
    dispatch({type: 'GUEST', payload: userLogin['username']})
    dispatch({type: 'LOGOUT'})
  }


  // JSX
  return (
    <div className="homepage-div-main">
      <div className="top-div">
        <div className="introducton">
          <div className="space-between">
            <h2>Welcome</h2>
            {
              isLoggedIn ? 
              <input className="default-button" type="button" value='logout' onClick={Logout} />
              :
              <input className="default-button" type="button" value='login or signup' onClick={() => navigate('/login')} />
            }
          </div>

          <h1>Melodrift</h1>
          <p>Audio hosting plartform.</p>

          <div className="new-music" style={{ height: artistmusiclist ? 150 : 0 }}>
          {
            artistmusiclist ?
              <MusicList
                MusicListData={artistmusiclist}
                listTitle={chartName === 'new-music/all-genres' ? 'New Music': `Top 10 ${chartName}`}
                errorMessage='no song is charting yet.'
                admin={false}
                style={{padding: "clamp(20px, 5.55vw, 50px) 0 0 0"}}
                audioPlayerStyle={{ width: "clamp(150px, 55vw, 200px)", backgroundColor: 'rgb(var(--clr-background-lighter))', backdropFilter: 'blur(3px)'}}
                columnOrRow='row'
              />
            : null
          }
        </div>
        
          <div className="about-us">
            <nav>
              {/* <h5>QuickLinks</h5> */}
              <ul>
                <li className="default-button">Upload</li>
                <li>Reports</li>
                <li>Terms and conditions</li>
              </ul>
            </nav>
          </div>

        </div>
      </div>

      <div className="bottom-div">
        <LabelListGrid
          labelListArr={labelsArray}
          labelsClickHandler={setChartHandler}
        />
      </div>

      {
            mainsong?.id && artistmusiclist && artistmusiclist.length &&
            (
              <MainAudioPlayer
              id={artistmusiclist[mainsong?.i]?.id}
              onSkip={onSkipLocal}
              Expand={true}
              />
            )
      }
    </div>
  );
}
