import React from 'react';

const Features = () => {
  return (
    <section id="features">
      <div className="row">
        <div className="feature-box col-lg-4">
          <i className="icon fa-sharp fa-solid fa-circle-check fa-4x"></i>
          <h3 className="features-title">Facile à utiliser</h3>
          <p>Des interfaces intuitives, fluidité en navigation.</p>
        </div>
        <div className="feature-box col-lg-4">
          <i className="icon fa-solid fa-bullseye fa-4x"></i>
          <h3 className="features-title">Excellence</h3>
          <p>Nos ressources ou produits sont bien choisis.</p>
        </div>
        <div className="feature-box col-lg-4">
          <i className="icon fa-solid fa-graduation-cap fa-4x"></i>
          <h3 className="features-title">Accompagnement</h3>
          <p>En matière de stage, collaborations et autres.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
