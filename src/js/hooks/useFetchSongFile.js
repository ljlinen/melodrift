import { useEffect, useState } from 'react'
import { baseUrl } from '../..';
  
export default function useFetchSongFile(id) {

  const [file, setFile] = useState(0);
  const [currentAudioId, setCurrentAudioId] = useState();

  useEffect(() => {

    if (!id || currentAudioId === id) return;

    (async () => {
      if(!id) return;
      setFile(baseUrl + "/song/file/" + id);
      setCurrentAudioId(id);
    })();

      // updateSong(byAudioPlayer['SongData']['publisher'], 'plays', id)
    // eslint-disable-next-line
  }, [id]);

  return { file, currentAudioId }
}
