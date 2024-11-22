import React, { useRef, useState } from "react";
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { Progress } from "rsuite";
import { BsArrowsFullscreen } from "react-icons/bs";
import "./VideoPlayer.css";
import { allVideos } from "../../assets/api/videos";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [isMute, setIsMute] = useState(false);
  const [videoNumber, setVideoNumber] = useState(0);

  const videoRef = useRef(null);

  const handlePlay = () => {
    try {
      setIsPlaying((p) => !p);
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
    } catch (err) {
      console.log(err);
    }
  };

  const handleMute = () => {
    if (videoRef.current.volume > 0) {
      videoRef.current.volume = 0;
      setIsMute(true);
    } else {
      videoRef.current.volume = 1;
      setIsMute(false);
    }
  };

  const handleNext = () => {
    setVideoNumber((n) => (n + 1) % allVideos.length);
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    setVideoNumber((n) => (n - 1 + allVideos.length) % allVideos.length);
    setIsPlaying(false);
  };

  const handleFullScreen = () => {
    videoRef.current.requestFullscreen();
  };

  const handleProgress = () => {
    if (!videoRef.current) return;
    try {
      let interval = null;
      if (isPlaying && videoRef.current) {
        interval = setInterval(() => {
          if (videoRef.current.currentTime !== null) {
            setProgressValue(
              (videoRef.current.currentTime / videoRef.current.duration) * 100
            );
          }
          setCurrentVideoTime(videoRef.current.currentTime);
          setDuration(videoRef.current.duration);
        }, 1000);
      } else {
        clearInterval(interval);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatTime = (time) => {
    let mm = Math.floor(time / 60);
    let ss = Math.floor(time % 60);
    mm = String(mm).padStart(2, "0");
    ss = String(ss).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  return (
    <div>
      <h2>Videos</h2>
      <video
        src={allVideos[videoNumber].videosrc}
        ref={videoRef}
        onTimeUpdate={handleProgress}
        onClick={handlePlay}
        width="620px"
      />
      <br />
      <div className="progress">
        {formatTime(duration)}
        <Progress.Line percent={progressValue} showInfo={false} />
        {formatTime(currentVideoTime)}
      </div>
      <div className="controls-div">
        <div className="controls">
          <GiPreviousButton
            style={{ cursor: "pointer" }}
            onClick={handlePrevious}
          />
          {isPlaying ? (
            <FaPause onClick={handlePlay} style={{ cursor: "pointer" }} />
          ) : (
            <FaPlay onClick={handlePlay} style={{ cursor: "pointer" }} />
          )}
          <GiNextButton style={{ cursor: "pointer" }} onClick={handleNext} />
        </div>
        {isMute ? (
          <FaVolumeUp onClick={handleMute} style={{ cursor: "pointer" }} />
        ) : (
          <FaVolumeMute onClick={handleMute} style={{ cursor: "pointer" }} />
        )}
        <BsArrowsFullscreen
          onClick={handleFullScreen}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
