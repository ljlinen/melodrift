import { useEffect, useState } from 'react'
import { ImgStringToUrl, baseFetch } from '../..';
  
export default function useFetchSongData(id) {

  const [SongData, setSongData] = useState();
  const [FetchedSongData, setFetchedSongData] = useState();
  const [componentActive, setComponentActive] = useState();

  useEffect(() => {
    
    (async () => {

      try {
        const audioObject = await baseFetch({
          route: "/song/" + id,
          method: "GET",
        });

        if (audioObject && audioObject["data"]) {
          const imgStr = audioObject["data"]["cover"];
          audioObject["data"]["cover"] = ImgStringToUrl(imgStr);
          setSongData(audioObject["data"]);
          setFetchedSongData(audioObject["data"]);
          setComponentActive(true);
        }
        
      } catch (error) {
        console.log(error);
      }
    })();

  }, [id]);

  return { FetchedSongData, SongData, componentActive }
}
