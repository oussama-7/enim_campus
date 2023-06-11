import { useNavigate, useParams, Link } from "react-router-dom";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Rating from "./Rating";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { Store } from "./Store";

import Nav from "./Nav";
import MessageBox from "./MessageBox";
import { AuthContext } from "../../context/AuthContext";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toast } from "react-toastify";
import LoadingBox from "./LoadingBox";
import { getError } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import './shop.css';

const reducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_PRODUCT":
      return { ...state, product: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreateReview: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreateReview: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreateReview: false };
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  let reviewsRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `http://localhost:8800/api/products/slug/${slug}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const { user } = useContext(AuthContext);
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id); //find if the current product exists in the card or not
    const quantity = existItem ? existItem.quantity + 1 : 1; //increase quantity if yes , sinon 1
    const { data } = await axios.get(
      `http://localhost:8800/api/products/${product._id}`
    );
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    //add items to the cart
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    // navigate("/cart"); //navigate to other pages
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      toast.error("Please enter comment and rating");
      return;
    }
    try {
      const { data } = await axios.post(
        `http://localhost:8800/api/products/${product._id}/reviews`,
        { rating, comment, name: user.username },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: "CREATE_SUCCESS",
      });
      toast.success("Review submitted successfully");
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      dispatch({ type: "REFRESH_PRODUCT", payload: product });
      window.scrollTo({
        behavior: "smooth",
        top: reviewsRef.current.offsetTop,
      });
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: "CREATE_FAIL" });
      setRating(0);
      setComment("");
    }
  };
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="productscreen-wrapper">
      <Nav />
      <div className="row-wrapper"  >
        <Row >
          <div className="row-container">
            <div>
              <Col>
                <img
                  className="img-large"
                  src={product.image}
                  alt={product.name}
                />
              </Col>
            </div>
            
            <div>
              
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Helmet>
                      <title>{product.name}</title>
                    </Helmet>
                    <h1>{product.name}</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    ></Rating>
                  </ListGroup.Item>
                  <ListGroup.Item>Prix: {product.price} </ListGroup.Item>
                  <ListGroup.Item>
                    Description:
                    <p style={{ overflowWrap: 'break-word' }}>{product.description}</p>
                  </ListGroup.Item>
                </ListGroup>
              
            
                
                <Card className="border-0 summary-screen">
                  <Card.Body className="summary-screen">
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Prix:</Col>
                          <Col>{product.price} DH</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {product.countInStock > 0 ? (
                              <Badge bg="success">En Stock</Badge>
                            ) : (
                              <Badge bg="danger">Rupture de Stock</Badge>
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {product.countInStock > 0 && user && (
                        <ListGroup.Item className="border-0">
                          <div className="d-grid">
                            <Button
                              onClick={addToCartHandler}
                              variant="primary"
                            >
                              <div className="cart-icon">
                                <FontAwesomeIcon icon={faCartShopping} />
                              </div>
                            </Button>
                          </div>
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>
              
            </div>
          </div>
        </Row>
        </div>
      <div className="my-3 review-container" style={{ maxWidth: '800px' , margin: '0 auto' }}>
        <h2 ref={reviewsRef}>Reviews</h2>
        <div className="mb-3">
          {product.reviews.length === 0 && (
            <MessageBox>There is no review</MessageBox>
          )}
        </div>
        <ListGroup className="rating-list">
          {product.reviews.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.username}</strong>
              <Rating rating={review.rating} caption=" "></Rating>
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="my-3 ">
          {user ? (
            <form onSubmit={submitHandler}>
              <h2> Write a customer review</h2>
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  aria-label="Rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1- Poor</option>
                  <option value="2">2- Fair</option>
                  <option value="3">3- Good</option>
                  <option value="4">4- Very good</option>
                  <option value="5">5- Excelent</option>
                </Form.Select>
                
              </Form.Group>
             
              <FloatingLabel
                controlId="floatingTextarea"
                label="Comments"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </FloatingLabel>
              
              <div className="mb-3">
                <Button disabled={loadingCreateReview} type="submit">
                  Submit
                </Button>
                {loadingCreateReview && <LoadingBox></LoadingBox>}
              </div>
            </form>
          ) : (
            <MessageBox>
              Please{" "}
              <Link to={`/login?redirect=/product/${product.slug}`}>
                Sign In
              </Link>{" "}
              to write a review
            </MessageBox>
          )}
        </div>
      </div>
    </div>
  );
}
export default ProductScreen;
