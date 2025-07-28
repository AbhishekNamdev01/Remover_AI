import React, { useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import "./Header.css";

const Header = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setProcessedImage(null);
      setShowPopup(true);
      handleRemoveBg(file);
    }
  };

  const handleRemoveBg = async (imageFile) => {
    if (!imageFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image_file", imageFile);
    formData.append("size", "auto");

    try {
      const response = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        formData,
        {
          responseType: "blob",
          headers: {
            "X-Api-Key": "2fQFjek8Ue8FSnDqMbx9bG59",
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

  const resetUpload = () => {
    setSelectedImage(null);
    setProcessedImage(null);
    setShowPopup(false);
  };

  return (
    <div className="remove-bg-container">
      <div className="left-section">
        <h1>
          Remove the <span className="highlight">background</span> from images
          for free.
        </h1>
        <p>
          100% automatic and free — just upload your image and download it
          without the background.
        </p>
        <input
          id="fileInput"
          className="upload-button"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div className="right-section">
        <div className="image-container">
          <img src={assets.header_img} alt="demo" />
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{loading ? "Processing..." : "Background Removed"}</h2>
            {loading ? (
              <p>Please wait while we process your image...</p>
            ) : (
              <>
                {processedImage && (
                  <img src={processedImage} alt="Removed Background" />
                )}
                <div className="btn-group">
                  <a href={processedImage} download="no-bg.png">
                    <button>Download</button>
                  </a>
                  <button onClick={resetUpload}>Reset</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
