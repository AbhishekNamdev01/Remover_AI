import React, { useState } from "react";
import axios from "axios";

const RemoveBg = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setProcessedImage(null); // reset
    }
  };

  const handleRemoveBg = async () => {
    if (!selectedImage) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image_file", selectedImage);
    formData.append("size", "auto");

    try {
      const response = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        formData,
        {
          responseType: "blob", // we get image as blob
          headers: {
            "X-Api-Key": "2fQFjek8Ue8FSnDqMbx9bG59", // <-- replace with your key
          },
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setProcessedImage(imageUrl);
    } catch (error) {
      console.error("Error removing background:", error);
      alert("Background removal failed.");
    }

    setLoading(false);
  };

  return (
    <div className="remove-bg-wrapper">
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {selectedImage && (
        <button onClick={handleRemoveBg}>
          {loading ? "Removing..." : "Remove Background"}
        </button>
      )}

      {processedImage && (
        <div>
          <h3>Background Removed Image:</h3>
          <img src={processedImage} alt="no-bg" />
          <a href={processedImage} download="no-bg.png">
            Download Image
          </a>
        </div>
      )}
    </div>
  );
};

export default RemoveBg;
