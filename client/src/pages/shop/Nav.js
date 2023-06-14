import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavDropdown, Badge, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { Store } from "./Store";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import { getError } from "../../utils";
import { toast } from "react-toastify";
import SearchBox from "./SearchBox";
import "./shop.css";

const Navi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, dispatch } = useContext(AuthContext);
  const { state } = useContext(Store);
  const { fullBox, cart } = state;
  const {
    cart: { cartItems },
  } = state;
  const signoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("shippingAddress");
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
          ? fullBox
            ? "site-container  d-flex flex-column full-box"
            : "site-container  d-flex flex-column"
          : fullBox
          ? "site-container d-flex flex-column full-box"
          : "site-container d-flex flex-column"
      }
    >
      <header>
        <Navbar className=" navbar navbar-expand-lg navbar-dark"   >
          
          {/* <Container > */}
            {/* <Button
              variant="dark"
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <i className="fas fa-bars"></i>
            </Button> */}
            <div className="d-flex align-items-center flex-grow-1 pl-3">
            <LinkContainer to="/homescreen">
              <Navbar.Brand className="nav-item">Boutique</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <SearchBox />
            </Navbar.Collapse>
            </div>
              <div className="ms-auto">
                
              <Nav className="me-auto w-100% justify-content-end">
              <LinkContainer to="/">
              <Navbar.Brand className="nav-item">Enim Campus</Navbar.Brand>
            </LinkContainer>
                {user ? (
                  <>
                    <Link to="/cart" className="navbar-brand">
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
                  <Link to="/cart"  className="nav-link">
                    Cart
                  </Link>
                )}
                {user !== null ? (
                  <NavDropdown title={user.username} id="basic-nav-dropdown" >
                    <LinkContainer to="/profile">
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
                  <Link
                    className="nav-link"
                    to={{
                      pathname: "/login",
                      state: { from: location.pathname || '/homescreen' },
                    }}
                  >
                    Sign In
                  </Link>
                )}
                {user !== null && user.isAdmin && (
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
                    
                  </NavDropdown>
                )}
                ,
                
              </Nav>
              </div>
          {/* </Container> */}
         
        </Navbar>
        
      </header>
      {/* <div
                  className={
                    sidebarIsOpen
                      ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
                      : "side-navbar d-flex justify-content-between flex-wrap flex-column"
                  }
                >
                  <Nav className="flex-column text-white w-100 p-2">
                    <Nav.Item>
                      <strong>Categories</strong>
                    </Nav.Item>
                    {categories.map((category) => (
                      <Nav.Item key={category}>
                        <LinkContainer
                          to={{
                            pathname: "/search",
                            search: `category=${category}`,
                          }}
                          onClick={() => setSidebarIsOpen(false)}
                        >
                          <Nav.Link>{category}</Nav.Link>
                        </LinkContainer>
                      </Nav.Item>
                    ))}
                  </Nav>
                </div> */}
    </div>
  );
};
export default Navi;