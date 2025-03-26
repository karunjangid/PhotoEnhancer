import React from "react";
import "../styles/Futuristic.css";

const Card = ({ title, description }) => {
  return (
    <div className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;
