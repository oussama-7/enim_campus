import "./navbar.css"
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <div className="navbar-para">
      <div className="navContainer">
        <Link to="/" style={{color :"inherit",textDecoration:"none"}}>
        <span className="logo">ENIM CAMPUS</span>
        </Link>
        
      </div>
    </div>
  )
}

export default Navbar