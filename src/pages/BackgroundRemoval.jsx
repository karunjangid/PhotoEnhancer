import React, { useState } from "react";
import axios from "axios";

const BackgroundFeature = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleBackgroundRemoval = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/api/background", formData, {
        responseType: "blob",
      });
      const imageUrl = URL.createObjectURL(response.data);
      setProcessedImage(imageUrl);
    } catch (error) {
      console.error("Error removing background:", error);
    }
  };

  return (
    <div className="feature-container">
      <h2>Background Removal</h2>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleBackgroundRemoval} className="futuristic-button">Remove Background</button>
      {processedImage && <img src={processedImage} alt="Background removed output" />}
    </div>
  );
};

export default BackgroundFeature;
