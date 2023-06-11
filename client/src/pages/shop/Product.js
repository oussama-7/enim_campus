import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useContext } from 'react';
import axios from 'axios';
import { Store } from './Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './shop.css'
import { AuthContext } from '../../context/AuthContext';
function Product(props) {
  const { product } = props;
const{user} = useContext(AuthContext)
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id); //find if the current product exists in the card or not
    const quantity = existItem ? existItem.quantity + 1 : 1; //increase quantity if yes , sinon 1
    const { data } = await axios.get(
      `http://localhost:8800/api/products/${item._id}`
    ); //get product from backend
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="product border-0 ">
      
      <Link to={`/product/${product.slug}`}>
        <div  className='product-img_container'>
        <img src={product.image} className="card-img-top" alt={product.name} style={{ objectFit: "cover",width: "200px", height: "200px" }} />
        </div> 
      </Link>

      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>{product.price} DH</Card.Text>
      </Card.Body>
        {product.countInStock === 0 ? (
          <Button variant="Light " disabled>
            En rupture de stock
          </Button>
        ) : (
           user && (
          <Button className='panier-btn product-overlay' onClick={() => addToCartHandler(product)}>
            <div className="cart-icon">
    <FontAwesomeIcon icon={faCartShopping} />
  </div>
          </Button>
           )
          )}
        
       
    </Card>
  );
}
export default Product;
