import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { NavDropdown, Badge, Button } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { Store } from './Store';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';
import { getError } from '../../utils';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox';

const Navi = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const { state } = useContext(Store);
  const { cart } = state;
  const {
    cart: { cartItems },
  } = state;
  const signoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('shippingAddress');
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8800/api/products/categories`
        );
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <div
      className={
        sidebarIsOpen
          ? 'site-container active-cont d-flex flex-column full-box'
          : 'site-container active-cont d-flex flex-column'
      }
    >
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Button
              variant="dark"
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <i className="fas fa-bars"></i>
            </Button>
            <LinkContainer to="/">
              <Navbar.Brand>Boutique</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <SearchBox />
              <Nav className="me-auto w-100 justify-content-end">
                {user ? (
                  <>
                    <Link to="/cart" className="nav-link">
                      Cart
                      {cart.cartItems.length > 0 && (
                        <Badge pill bg="danger">
                          {/* {cart.cartItems.length} */}
                          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </Badge>
                      )}
                    </Link>
                  </>
                ) : (
                  <Link to="/cart" className="nav-link">
                    Cart
                  </Link>
                )}
                {user !== null ? (
                  <NavDropdown title={user.username} id="basic-nav-dropdown">
                    <LinkContainer to="/profile2">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/login">
                    Sign In
                  </Link>
                )}
                {user !== null && user.isAdmin !== null && (
                  <NavDropdown title="Admin" id="admin-nav-dropdown">
                    <LinkContainer to="/admin/dashboard">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/products">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/users">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <div
        className={
          sidebarIsOpen
            ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
            : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
        }
      >
        <Nav className="flex-column text-white w-100 p-2">
          <Nav.Item>
            <strong>Categories</strong>
          </Nav.Item>
          {categories.map((category) => (
            <Nav.Item key={category}>
              <LinkContainer
                to={{ pathname: '/search', search: `category=${category}` }}
                onClick={() => setSidebarIsOpen(false)}
              >
                <Nav.Link>{category}</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </div>
  );
};
export default Navi;
