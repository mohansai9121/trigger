import React, { useEffect, useRef, useState } from "react";
import "./Music.css";
import { GiNextButton } from "react-icons/gi";
import { GiPreviousButton } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { allSongs } from "../../assets/api/songs.js";
import { Progress } from "rsuite";

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
    setSongNumber((n) => (n - 1 + allSongs.length) % allSongs.length);
    setCurrentSong(allSongs[songNumber]);
  };

  const handleNext = () => {
    setSongNumber((n) => (n + 1) % allSongs.length);
    setCurrentSong(allSongs[songNumber]);
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
    <div>
      <h2>{currentSong.title}</h2>
      <img
        src={currentSong.picture}
        alt="Song img"
        width="650px"
        className="song-img"
      />
      <div className="progress-layout">
        {formatTime(songref.current.duration)}
        <Progress.Line
          percent={
            (songref.current.currentTime / songref.current.duration) * 100
          }
          showInfo={false}
        />
        {formatTime(currentSongTime)}
      </div>
      <br />
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
  );
};

export default Music;
