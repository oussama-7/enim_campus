import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import './header.css';

const Header = () => {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickLogout = async (req, res, next) => {
    dispatch({ type: 'LOGOUT' });
    try {
      await axios.post('/auth/logout');

      navigate('/');
    } catch (err) {
      next(err);
    }
  };

  return (
    <section id="title">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link to="/">
            <span className="navbar-brand" to="">
              Enim Campus
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <span className="nav-link" to="">
                  Scolaire
                </span>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/parascolaire">
                  Parascolaire
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Stage1">
                  Stage
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/homescreen">
                  Shop
                </Link>
              </li>
              {user && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {user.username}{' '}
                    <img
                      className="cellImg"
                      src={user.img || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                      alt="avatar"
                    />
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link to="/profile">
                      <span className="dropdown-item">Profile</span>
                    </Link>
                    <Link to="/">
                      <span
                        className="dropdown-item"
                        onClick={handleClickLogout}
                      >
                        Logout
                      </span>
                    </Link>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <div className="row">
          <div className="col-lg-6">
            <h1 className="big-heading">
              Enim Campus: Simplifiez votre vie étudiante.
            </h1>
            {!user && (
              <>
                <Link to="/login">
                  <button
                    type="button"
                    className="btn btn-dark btn-lg download-button"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    type="button"
                    className="btn btn-outline-light btn-lg download-button"
                  >
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
          <div className="col-lg-6 left-section">
            <img
              className="logo-img"
              src="https://cdn-05.9rayti.com/rsrc/cache/widen_292/uploads/2012/07/mines-rabat-logo.png"
              alt="mines-rabat"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
