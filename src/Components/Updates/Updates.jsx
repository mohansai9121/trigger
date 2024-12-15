import { useState } from "react";
import PhotoUpload from "./PhotoUpload";
import PhotoList from "./PhotoList";
import "./Updates.css";
import { Link } from "react-router-dom";

const Updates = () => {
  const [photos, setPhotos] = useState([]);

  const addPhoto = (photo) => {
    setPhotos([...photos, photo]);
  };

  return (
    <>
      <Link to="/">
        <button>Home</button>
      </Link>
      <div className="app">
        <h1>Photo Description App</h1>
        <PhotoUpload addPhoto={addPhoto} />
        <PhotoList photos={photos} />
      </div>
    </>
  );
};

export default Updates;
