import { useState, useRef } from "react";
import { allVideos } from "../../assets/api/videos";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { FaPlay, FaPause } from "react-icons/fa";
import "./Video.css";
import { Link } from "react-router-dom";

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(allVideos[0]);
  const [videoNumber, setVideoNumber] = useState(0);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextVideoNumber = (videoNumber + 1) % allVideos.length;
    setVideoNumber(nextVideoNumber);
    setCurrentVideo(allVideos[nextVideoNumber]);
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    const prevVideoNumber =
      (videoNumber - 1 + allVideos.length) % allVideos.length;
    setVideoNumber(prevVideoNumber);
    setCurrentVideo(allVideos[prevVideoNumber]);
    setIsPlaying(false);
  };

  const handleVideoSelect = (index) => {
    setVideoNumber(index);
    setCurrentVideo(allVideos[index]);
    setIsPlaying(false);
  };

  return (
    <>
      <Link to="/">
        <button>Home</button>
      </Link>
      <div className="video-container">
        <div className="video-player">
          <video
            ref={videoRef}
            src={currentVideo.videosrc}
            className="main-video"
            onEnded={handleNext}
          />
          <div className="video-controls">
            <GiPreviousButton
              className="control-button"
              onClick={handlePrevious}
            />
            {isPlaying ? (
              <FaPause className="control-button" onClick={handlePlay} />
            ) : (
              <FaPlay className="control-button" onClick={handlePlay} />
            )}
            <GiNextButton className="control-button" onClick={handleNext} />
          </div>
        </div>

        <div className="playlist-container">
          <h3 style={{ color: "white", marginBottom: "1rem" }}>
            Video Playlist
          </h3>
          <div className="videos-list">
            {allVideos.map((video, index) => (
              <div
                key={video.slno}
                className={`video-item ${
                  index === videoNumber ? "playing" : ""
                }`}
                onClick={() => handleVideoSelect(index)}
              >
                <video src={video.videosrc} className="video-thumbnail" muted />
                <div className="video-info">
                  <span>Video {index + 1}</span>
                  <span className="video-category">
                    {video.category.join(", ")}
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

export default Video;
