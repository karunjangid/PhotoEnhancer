import React from "react";
import "../styles/Futuristic.css";

const ContactForm = () => {
  return (
    <div className="contact-formm">
    <form className="contact-form">
      <h3 className="form-title">We'd Love to Hear From You</h3>
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <textarea placeholder="Your Message" required></textarea>
      <button type="submit" className="futuristic-button">Send Message</button>
    </form>
    </div>
  );
};

export default ContactForm;
