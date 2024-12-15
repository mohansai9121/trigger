import { useEffect, useRef, useState } from "react";
import "./Music.css";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { FaPlay, FaPause } from "react-icons/fa";
import { allSongs } from "../../assets/api/songs.js";
import { Progress } from "rsuite";
import { Link } from "react-router-dom";

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(allSongs[0]);
  const [currentSongTime, setCurrentSongTime] = useState(0);
  const [songNumber, setSongNumber] = useState(0);

  const songref = useRef(new Audio(currentSong.song));

  const handlePlay = () => {
    setIsPlaying((p) => !p);
    isPlaying ? songref.current.pause() : songref.current.play();
  };

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSongTime(songref.current.currentTime);
      }, 1000);
    } else {
      clearInterval(interval);
    }
  }, [isPlaying]);

  const handlePrevious = () => {
    const prevSongNumber = (songNumber - 1 + allSongs.length) % allSongs.length;
    setSongNumber(prevSongNumber);
    setCurrentSong(allSongs[prevSongNumber]);
  };

  const handleNext = () => {
    const nextSongNumber = (songNumber + 1) % allSongs.length;
    setSongNumber(nextSongNumber);
    setCurrentSong(allSongs[nextSongNumber]);
  };

  const formatTime = (time) => {
    let mm = Math.floor(time / 60);
    let ss = Math.floor(time % 60);
    mm = String(mm).padStart(2, "0");
    ss = String(ss).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  useEffect(() => {
    songref.current.src = currentSong.song;
    songref.current.load();

    let songRefCurrent = songref.current;

    return () => {
      songRefCurrent.pause();
      songRefCurrent.currentTime = 0;
      setIsPlaying(false);
    };
  }, [currentSong]);

  return (
    <>
      <Link to="/">
        <button>Home</button>
      </Link>
      <div className="music-container">
        <div className="music-player">
          <h2>{currentSong.title}</h2>
          <img src={currentSong.picture} alt="Song img" className="song-img" />
          <div className="progress-layout">
            {formatTime(songref.current.duration)}
            <Progress.Line
              percent={
                (songref.current.currentTime / songref.current.duration) * 100
              }
              showInfo={false}
              strokeWidth={4}
              strokeColor="#007bff"
              trailColor="#d3d3d3"
              style={{ width: "300px" }}
            />
            {formatTime(currentSongTime)}
          </div>
          <div className="song-buttons">
            <GiPreviousButton onClick={handlePrevious} />
            {isPlaying ? (
              <FaPause onClick={handlePlay} />
            ) : (
              <FaPlay onClick={handlePlay} />
            )}
            <GiNextButton onClick={handleNext} />
          </div>
        </div>

        <div className="playlist-container">
          <h3>Playlist</h3>
          <div className="songs-list">
            {allSongs.map((song, index) => (
              <div
                key={song.sno}
                className={`song-item ${index === songNumber ? "playing" : ""}`}
                onClick={() => {
                  setSongNumber(index);
                  setCurrentSong(allSongs[index]);
                }}
              >
                <img
                  src={song.picture}
                  alt={song.title}
                  className="song-thumbnail"
                />
                <div className="song-info">
                  <span className="song-title">{song.title}</span>
                  <span className="song-category">
                    {song.category.join(", ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Music;
