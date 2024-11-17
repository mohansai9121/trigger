import React, { useEffect, useRef, useState } from "react";
import song from "../../assets/telugu-songs/Anjanadri_theme_song.mp3";
import logo from "../../assets/images/trigger-logo.png";
import "./Music.css";
import { GiNextButton } from "react-icons/gi";
import { GiPreviousButton } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentPlayingTime, setCurrentPlayingTime] = useState(0);

  const songref = useRef(new Audio(song));
  const progressRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying((p) => !p);
    isPlaying ? songref.current.pause() : songref.current.play();

    songref.current.onloadedmetadata = () => {
      setDuration(songref.current.duration);
    };

    songref.current.onloadedmetadata = () => {
      setCurrentPlayingTime(songref.current.currentTime);
    };

    console.log("song:", songref.current);
  };

  const handleProgressPlay = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progressWidth = rect.width;
    const newTime = (clickX / progressWidth) * duration;
    songref.current.currentTime = newTime;
    setCurrentPlayingTime(newTime);
  };

  const formatTime = (time) => {
    const mm = Math.floor(time / 60);
    const ss = Math.floor(time % 60);
    return `${mm}:${ss}`;
  };

  useEffect(() => {
    songref.current.src = song;
    songref.current.load();

    songref.current.onloadedmetadata = () => {
      setDuration(songref.current.duration);
    };

    songref.current.onloadedmetadata = () => {
      setCurrentPlayingTime(songref.current.currentTime);
    };

    /*return ()=>{
      songref.current.pause()
      songref.current.currentTime = 0
    }*/
  }, []);

  return (
    <div>
      <h2>Song name...</h2>
      <img src={logo} alt="Song img" height={350} className="song-img" />
      <div className="progress-layout" ref={progressRef}>
        {formatTime(songref.current.duration)}
        <div className="progress-container" onClick={handleProgressPlay}>
          <div
            className="progress-bar"
            style={{ width: `${(currentPlayingTime / duration) * 100}%` }}
          ></div>
        </div>
        {formatTime(songref.current.currentTime)}
      </div>
      <br />
      <div className="song-buttons">
        <GiPreviousButton />
        {isPlaying ? (
          <FaPause onClick={handlePlay} />
        ) : (
          <FaPlay onClick={handlePlay} />
        )}
        <GiNextButton />
      </div>
    </div>
  );
};

export default Music;
