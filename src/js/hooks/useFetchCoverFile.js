import { useEffect, useState } from 'react'
import { baseUrl } from '../../main';
  
export default function useFetchCoverFile(id) {

  const [cover, setCover] = useState(0);

  useEffect(() => {

    if (!id) return;

    (async () => {
      if(!id) return;
      setCover(baseUrl + "/cover/" + id);
    })();

    // eslint-disable-next-line
  }, [id]);

  return cover
}
