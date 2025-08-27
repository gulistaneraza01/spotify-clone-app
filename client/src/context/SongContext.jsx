import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const server = "http://13.235.70.183:8000";

const SongContext = createContext(undefined);

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [albums, setAlbums] = useState([]);

  const fetchSongs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/v1/song/all`);
      setSongs(data);
      if (data.length > 0) setSelectedSong(data[0].id.toString());
      setIsPlaying(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const [song, setSong] = useState(null);

  const fetchSingleSong = useCallback(async () => {
    if (!selectedSong) return;
    try {
      const { data } = await axios.get(`${server}/api/v1/song/${selectedSong}`);
      setSong(data);
    } catch (error) {
      console.log(error);
    }
  }, [selectedSong]);

  const fetchAlbums = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/v1/album/all`);
      setAlbums(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const [index, setIndex] = useState(0);

  const nextSong = useCallback(() => {
    if (index === songs.length - 1) {
      setIndex(0);
      setSelectedSong(songs[0]?.id.toString());
    } else {
      setIndex((prevIndex) => prevIndex + 1);
      setSelectedSong(songs[index + 1]?.id.toString());
    }
  }, [index, songs]);

  const prevSong = useCallback(() => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      setSelectedSong(songs[index - 1]?.id.toString());
    }
  }, [index, songs]);

  const [albumSong, setAlbumSong] = useState([]);
  const [albumData, setAlbumData] = useState(null);

  const fetchAlbumsongs = useCallback(async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/v1/album/${id}`);

      setAlbumData(data.album);
      setAlbumSong(data.songs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);
  return (
    <SongContext.Provider
      value={{
        songs,
        selectedSong,
        setSelectedSong,
        isPlaying,
        setIsPlaying,
        loading,
        albums,
        fetchSingleSong,
        song,
        nextSong,
        prevSong,
        fetchAlbumsongs,
        albumData,
        albumSong,
        fetchSongs,
        fetchAlbums,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSongData = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSongData must be used within a songProvider");
  }
  return context;
};
