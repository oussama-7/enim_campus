import { useContext } from "react";
import { Store } from "./Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import MessageBox from "./MessageBox";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/Badge";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AuthContext } from "../../context/AuthContext";
import Nav from "./Nav";
import "./shop.css";

export default function CartScreen() {
  // const { state } = useContext(Store);
  //The cart variable contains the current value of the cart property from the state object.
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(
      `http://localhost:8800/api/products/${item._id}`
    ); //get product from backend
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/login", { state: { from: "/shipping" } });
  };

  return (
    <div>
      <Nav />
      <Helmet>
        <title>Panier</title>
      </Helmet>
      
      <div className="cartscreen-container ">
        <h1>Panier de produits</h1>
        <div>
          <div className="flex-components">
            <div className="cart-container">
              <Col className="border-0">
                {cartItems.length === 0 ? (
                  <MessageBox>
                    Cart is empty. <Link to="/homescreen">Go Shopping</Link>
                  </MessageBox>
                ) : (
                  <ListGroup>
                    {cartItems.map((item) => (
                      <ListGroup.Item
                        className="border-0 flex-columns"
                        key={item._id}
                      >
                        <Row className="align-items-center">
                          <Col>
                            <img
                              src={item.image}
                              alt={item.name}
                              className=" border-0 img-fluid  img-thumbnail "
                              style={{borderRadius : '10px'}}
                            ></img>{" "}
                            <Link to={`/product/${item.slug}`}>
                              <span className="item-name">{item.name}</span>
                            </Link>
                          </Col>
                          <Col className="border-0">
                            <Button
                              variant="light"
                              onClick={() =>
                                updateCartHandler(item, item.quantity - 1)
                              }
                              disabled={item.quantity === 1}
                            >
                              <i className="fas fa-minus-circle"></i>
                            </Button>{" "}
                            <span>{item.quantity}</span>
                            {""}
                            <Button
                              variant="light"
                              onClick={() =>
                                updateCartHandler(item, item.quantity + 1)
                              }
                              disabled={item.quantity === item.countInStock}
                            >
                              <i className="fas fa-plus-circle"></i>
                            </Button>
                          </Col>
                          <Col className="border-0"> {item.price}</Col>
                          <Col className="border-0">
                            <Button
                              onClick={() => removeItemHandler(item)}
                              variant="light"
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Col>
            </div>
            <div className="subtotal-container">
              <ListGroup>
                <div className="summary">
                  <div>
                    <h3 className="subtotal">
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                      items) : {""}
                      <span className="total-price">
                        {cartItems.reduce(
                          (a, c) => a + c.price * c.quantity,
                          0
                        )}{" "}
                        dh
                      </span>
                    </h3>
                  </div>
                  <div>
                    <Button
                      className="panier-btn border-0"
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                     
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </ListGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
