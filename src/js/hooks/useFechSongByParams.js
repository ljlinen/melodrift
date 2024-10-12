import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SongPlayerPage() {

  const params = useParams();
  const SongId = params["songid"];
  const [artistMusicData, setArtistMusicData] = useState([])

  useEffect(() => {
    const newItem = { id: SongId };
    const newList = []
    newList.push(newItem)
    setArtistMusicData(newList)
  }, [SongId]);

  return artistMusicData;
}
