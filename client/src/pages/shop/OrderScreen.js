import React, { useContext, useEffect, useReducer } from "react";
import MessageBox from "./MessageBox";
import LoadingBox from "./LoadingBox";
import { useNavigate, useParams } from "react-router";
import { Store } from "./Store";
import { AuthContext } from "../../context/AuthContext";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import { getError } from "../../utils";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Nav from "./Nav2";
import { toast } from "react-toastify";
import "./shop.css";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };
    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      return state;
  }
}

export default function OrderScreen() {
  const { user } = useContext(AuthContext);

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();
  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
    successPay: false,
    loadingPay: false,
  });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }
  const handleALaLivraisonPayment = async () => {
    try {
      dispatch({ type: "PAY_REQUEST" });

      const { data } = await axios.put(
        `http://localhost:8800/api/orders/${order._id}/pay`,
        {
          paymentMethod: "a la livraison",
        },
        {
          withCredentials: true,
        }
      );

      dispatch({ type: "PAY_SUCCESS", payload: data });
      toast.success("Order is paid");
    } catch (err) {
      dispatch({ type: "PAY_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });

        const { data } = await axios.put(
          `http://localhost:8800/api/orders/${order._id}/pay`,
          details,
          {
            withCredentials: true,
          }
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
        toast.success("Order is paid");
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }
  function onError(err) {
    toast.error(getError(err));
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });

        const { data } = await axios.get(
          `http://localhost:8800/api/orders/${orderId}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (!user) {
      return navigate("/login");
    }
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
      }
      dispatch({ type: "PAY_RESET" });
      if (successDeliver) {
      }
      dispatch({ type: "DELIVER_RESET" });
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get(
          `http://localhost:8800/api/keys/paypal`,
          {
            withCredentials: true,
          }
          //
        );
        paypalDispatch({
          type: "resetOptions ",
          value: {
            "client-id ": clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [
    order,
    user,
    navigate,
    orderId,
    paypalDispatch,
    successPay,
    successDeliver,
  ]);

  async function deliverOrderHandler() {
    try {
      dispatch({ type: "DELIVER_REQUEST" });

      const { data } = await axios.put(
        `http://localhost:8800/api/orders/${order._id}/deliver`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      toast.success("Order is delivered");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "DELIVER_FAIL" });
    }
  }
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Nav />
      <Helmet>
        <title> Commande {orderId}</title>
      </Helmet>
      <h1 className="my-3 text-center"> Commande N- {orderId}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Livraison</Card.Title>
              <Card.Text>
                <strong>Nom complet:</strong> {order.shippingAddress.fullName} <br />
                <strong>Adresse: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                &nbsp;
                {order.shippingAddress.location &&
                  order.shippingAddress.location.lat && (
                    <a
                      className="show-map"
                      target="_new"
                      href={`https://maps.google.com?q=${order.shippingAddress.location.lat},${order.shippingAddress.location.lng}`}
                    >
                      Montrer sur la carte
                    </a>
                  )}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  livré le {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Pas encore livré</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Paiement</Card.Title>
              <Card.Text>
                <strong>Methode:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Payé le {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger"> Pas encore payé</MessageBox>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Montant Total</Card.Title>

              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Produits</Col>
                    <Col>{order.itemsPrice.toFixed(2)} DH </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Livraison</Col>
                    <Col>{order.shippingPrice.toFixed(2)} DH </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                 
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Total:</strong>
                    </Col>
                    <Col>
                      <strong>{order.totalPrice.toFixed(2)} DH </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroupItem>
                    {isPending ? (
                      <LoadingBox />
                    ) : (
                      <>
                        {order.paymentMethod === "PayPal" ? (
                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        ) : (
                          <div className="d-grid">
                            <Button
                              type="button"
                              onClick={handleALaLivraisonPayment}
                              className="panier-btn border-0"
                              
                            >
                              Payer
                            </Button>
                          </div>
                        )}
                        {loadingPay && <LoadingBox></LoadingBox>}
                      </>
                    )}
                  </ListGroupItem>
                )}
                {order.isPaid && !order.isDelivered && user.isAdmin && (
                  <ListGroup.Item>
                    {loadingDeliver && <LoadingBox></LoadingBox>}
                    <div className="d-grid">
                      <Button className="panier-btn border-0" type="button" onClick={deliverOrderHandler}>
                        Confirmer la livraison
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Card className=" border-0 "  >
          <Card.Body >
            <Card.Title>Produits</Card.Title>
            <div style={{ maxWidth: "1000px" }}>
              <ListGroup variant="flush">
                <div style={{ display: "flex" }}>
                  {order.orderItems.map((item) => (
                    <ListGroup.Item
                      key={item._id}
                      className="border-0 "
                      style={{
                        paddingLeft: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Row className="align-items-center border-o">
                        <Col
                          style={{
                            objectFit: "cover",
                            width: "200px",
                            // height: "200px",
                            // marginBottom: "20px",
                            // paddingBottom : "20px",
                            // display: "flex",
                            // flexDirection: "column",
                          }}
                          md={6}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid img-thumbnail"
                            style={{ borderRadius: "20px" }}
                          ></img>{" "}
                          <Link to={`/product/${item.slug}`}>
                            {" "}
                            <span className="item-name">{item.name}</span>
                          </Link>
                        </Col>
                        <Col >
                          <span>
                            {item.quantity}{" "}
                            {item.quantity > 1 ? "Produits" : "Produit"}
                          </span>
                        </Col>
                        <Col md={3} style={{marginTop :"5px"}} >{item.price} DH </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </div>
              </ListGroup>
            </div>
          </Card.Body>
        </Card>
      </Row>
    </div>
  );
}
