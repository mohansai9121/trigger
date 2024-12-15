import { useState } from "react";

const PhotoUpload = ({ addPhoto }) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (image && description) {
      addPhoto({ image, description });
      setImage(null);
      setDescription("");
    } else {
      alert("Please upload an image and add a description.");
    }
  };

  return (
    <div className="photo-upload">
      <form onSubmit={handleSubmit}>
        <label>
          Upload Photo:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <label>
          Add Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a description..."
          />
        </label>
        <button type="submit">Add Photo</button>
      </form>
      {image && (
        <div className="preview">
          <h3>Preview:</h3>
          <img src={image} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
