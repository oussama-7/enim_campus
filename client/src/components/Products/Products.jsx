import React from 'react';

const Products = () => {
  return (
    <section id="pricing">
      <h2 className="">Explorez notre boutique en ligne pour des produits exceptionnels !</h2>
      <p>Découvrez une sélection unique de produits de qualité pour enrichir votre expérience scolaire et parascolaire.</p>

      <div className="row">
        <div className="pricing-column col-lg-4 col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Hoodies</h3>
            </div>
            <div className="card-body">
              <h2 className="price-text">100$</h2>
              <p>Confort ultime</p>
              <p>Style tendance</p>
              <p>Polyvalence inégalée</p>
              <button type="button" className="btn btn-lg btn-block btn-dark">Acheter</button>
            </div>
          </div>
        </div>
        <div className="pricing-column col-lg-4 col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Jacket</h3>
            </div>
            <div className="card-body">
              <h2 className="price-text">100$</h2>
              <p>Confort ultime</p>
              <p>Style tendance</p>
              <p>Polyvalence inégalée</p>
              <button type="button" className="btn btn-lg btn-block btn-dark">Acheter</button>
            </div>
          </div>
        </div>
        <div className="pricing-column col-lg-4 col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Cachcol</h3>
            </div>
            <div className="card-body">
              <h2 className="price-text">100$</h2>
              <p>Confort ultime</p>
              <p>Style tendance</p>
              <p>Polyvalence inégalée</p>
              <button type="button" className="btn btn-lg btn-block btn-dark">Acheter</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
