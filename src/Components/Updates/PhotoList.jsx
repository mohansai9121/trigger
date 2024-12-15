const PhotoList = ({ photos }) => {
  return (
    <div className="photo-list">
      {photos.length === 0 ? (
        <p>No photos added yet. Start by uploading a photo!</p>
      ) : (
        photos.map((photo, index) => (
          <div key={index} className="photo-item">
            <img src={photo.image} alt={`Photo ${index + 1}`} />
            <p>{photo.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PhotoList;
