import React, { useState } from "react";
import axios from "axios";

const FiltersFeature = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filterType, setFilterType] = useState("EDGE_ENHANCE");
  const [processedImage, setProcessedImage] = useState(null);

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFilterApplication = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("filter", filterType);

    try {
      const response = await axios.post("http://localhost:5000/api/filters", formData, {
        responseType: "blob",
      });
      const imageUrl = URL.createObjectURL(response.data);
      setProcessedImage(imageUrl);
    } catch (error) {
      console.error("Error applying filter:", error);
    }
  };

  return (
    <div className="feature-container">
      <h2>Artistic Filters</h2>
      <input type="file" onChange={handleFileUpload} />
      <select onChange={(e) => setFilterType(e.target.value)}>
        <option value="EDGE_ENHANCE">Edge Enhance</option>
        <option value="BLUR">Blur</option>
        <option value="DETAIL">Detail</option>
      </select>
      <button onClick={handleFilterApplication} className="futuristic-button">Apply Filter</button>
      {processedImage && <img src={processedImage} alt="Filtered output" />}
    </div>
  );
};

export default FiltersFeature;
