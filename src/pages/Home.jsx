import React from "react";
import ContactForm from "../components/ContactForm";
import "../styles/Futuristic.css";
import Homeback from "../assets/homeback.mp4";
import { Link } from "react-router-dom";
import Blur from "../assets/blur.png"
import BandC from "../assets/BandC.png" 
import Artistic from "../assets/artistic.png"
import Backrem from "../assets/backrem.png"
import Res from "../assets/resolution.png"

const features = [
  {
    title: "Blur Adjustment",
    description: "Add or remove blur with AI-powered precision.",
    image:Blur,
    link: "/blur",
  },
  {
    title: "Brightness & Contrast",
    description: "Adjust brightness and contrast intelligently.",
    image: BandC,
    link: "/brightness",
  },
  {
    title: "Background Removal",
    description: "Seamlessly remove or replace image backgrounds.",
    image: Backrem,
    link: "/background",
  },
  {
    title: "Artistic Filters",
    description: "Apply creative filters powered by AI.",
    image: Artistic,
    link: "/filters",
  },
  {
    title: "Resolution Upscaling",
    description: "Boost image resolution using advanced AI models.",
    image: Res,
    link: "/resolution",
  },
];
const Home = () => {
  return (
    <div>
      {/* Video Section */}
      <section className="video-section">
        <video autoPlay loop muted className="background-video">
          <source src={Homeback} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <div className="video-overlay">
          <h1 className="neon-title">Welcome to Photo Enhancer</h1>
          <p className="neon-description">
            Redefine your images with state-of-the-art AI tools and creativity.
          </p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
      <div className="home-container">
      <section id="features" className="features-section">
        <h2 className="section-heading">Explore Our Features</h2>
        <div className="card-container">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <img src={feature.image} alt={`${feature.title} thumbnail`} className="feature-image" />
              <div className="card-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <Link to={feature.link} className="card-link">Try Now</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2 className="section-heading">About Us</h2>
        <p className="about-description">
          At Photo Enhancer, we leverage artificial intelligence to deliver a
          seamless photo editing experience. Our tools combine intuitive designs
          with innovative technology to help users achieve their creative goals.
        </p>
      </section>

      {/* Contact Section */}
      <ContactForm />
    </div>
  );
};

export default Home;
