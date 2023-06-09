import {
 
  faLocationDot,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./eventheader.css";
import { useContext, useState } from "react";
 import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const EventHeader = ({ type }) => {
  const [clubs] = useState([]);
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate("/events", { state: { clubs } });
  }
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
    
    <div className="header-para">
      <nav className="navbar navbar-expand-lg navbar-dark">
          
           <Link to="/parascolaire" style={{color :"inherit",textDecoration:"none"}}>
        <span className="logo">ENIM CAMPUS</span>
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
                <Link className="nav-link" to="/">
                  Home
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
              
            </ul>
          </div>
        </nav>
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Rabat, Morocco</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>aeenim-parascolaire@enim.ac.ma</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Cette page est dédiée aux événements organisés par les
              clubs/comités de l'école nationale supérieure des MINES.
            </h1>
            
            <div className="headerSearch">
                {/* <button className="headerBtn signInBtn">Sign in / Register</button> */}
                <button className="headerBtn" onClick={handleSearch}>
                 Visitez nos évenements
                </button>
              </div>
            
          </>
        )}
      </div>
    </div>
  );
};

export default EventHeader;