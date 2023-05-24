import React from 'react';
import { Link } from 'react-router-dom';
import "./footer.css"

const Footer = () => {
  return (
    <footer id="footer">
      <i className="logos fab fa-twitter"></i>
      <i className="logos fab fa-facebook"></i>
      <i className="logos fab fa-instagram"></i>
      <i className="logos fas fa-envelope"></i>
      <p>© Enim Campus</p>
    </footer>
  );
};

export default Footer;
