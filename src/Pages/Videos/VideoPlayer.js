import React, { useRef, useState } from "react";
import video from "../../assets/videos/boxing.mp4";
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { Progress } from "rsuite";
import { BsArrowsFullscreen } from "react-icons/bs";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  /*const [duration, setDuration] = useState(0);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);*/
  const [progressValue, setProgressValue] = useState(0);
  const [isMute, setIsMute] = useState(false);

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

  const handleFullScreen = () => {
    videoRef.current.requestFullscreen();
  };

  const handleProgress = () => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        if (videoRef.current.currentTime != null) {
          setProgressValue(
            (videoRef.current.currentTime / videoRef.current.duration) * 100
          );
        }
        /*setCurrentVideoTime(videoRef.current.currentTime);
        setDuration(videoRef.current.duration);*/
      }, 1000);
    } else {
      clearInterval(interval);
    }
  };

  /*const formatTime = (time) => {
    let mm = Math.floor(time / 60);
    let ss = Math.floor(time % 60);
    mm = String(mm).padStart(2, "0");
    ss = String(ss).padStart(2, "0");
    return `${mm}:${ss}`;
  };*/

  return (
    <div>
      <h2>Videos</h2>
      <video
        src={video}
        ref={videoRef}
        onTimeUpdate={handleProgress}
        onClick={handlePlay}
        width="550px"
      />
      <br />
      <div>
        {/*formatTime(duration)*/}
        <Progress.Line percent={progressValue} showInfo={false} />
        {/*formatTime(currentVideoTime)*/}
      </div>
      {isPlaying ? (
        <FaPause onClick={handlePlay} />
      ) : (
        <FaPlay onClick={handlePlay} />
      )}
      {isMute ? (
        <FaVolumeUp onClick={handleMute} />
      ) : (
        <FaVolumeMute onClick={handleMute} />
      )}
      <BsArrowsFullscreen onClick={handleFullScreen} />
    </div>
  );
};

export default VideoPlayer;
