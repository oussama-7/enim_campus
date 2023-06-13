import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { FaCalendarAlt, FaBook } from "react-icons/fa";
import { AuthContext } from "../../../../admin/src/context/AuthContext";
import axios from "axios";

const Sidebar = () => {
  const { dispatchTheme } = useContext(DarkModeContext);
  const { user ,loading, error, dispatch} = useContext(AuthContext);
  

  const navigate = useNavigate()
  const handleClickLogout=async (req,res,next) => {
      
    dispatch({ type: "LOGOUT" });
    try {
          await axios.post("/auth/logout");
      
      navigate("/")
    } catch (err) {
      next(err);
    }
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">enim campus</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          
         <Link to="/" style={{ textDecoration: "none" }}><li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          
          </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          
          <Link to="/events" style={{ textDecoration: "none" }}>
            <li>
              <FaCalendarAlt className="icon" />
              <span>Events</span>
            </li>
          </Link>
          
          
          
          
          
          <p className="title">USER</p>
        
          <li onClick={handleClickLogout}>
            <ExitToAppIcon className="icon" />
            <span >Logout</span>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;
