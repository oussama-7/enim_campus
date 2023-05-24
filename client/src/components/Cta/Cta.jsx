import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section id="cta">
      <h3 className="big-heading">Inscrivez-vous dès maintenant et découvrez les avantages exclusifs d'Enim Campus !</h3>
      <Link to="/login"><span to="" className="btn btn-dark btn-lg download-button">Login</span></Link>
      <Link to="/register"><span to="" className="btn btn-outline-light btn-lg download-button">Register</span></Link>
    </section>
  );
};

export default CTA;
