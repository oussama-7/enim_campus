import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps" style={{marginTop : '30px'}}>
      <Col style={{marginLeft : '10px'}} className={props.step1 ? 'active' : ''}>Authentification</Col>
      <Col className={props.step2 ? 'active' : ''}>Livraison</Col>
      <Col className={props.step3 ? 'active' : ''}>Paiement</Col>
      <Col className={props.step4 ? 'active' : ''}>Finalisation</Col>
    </Row>
  );
}
