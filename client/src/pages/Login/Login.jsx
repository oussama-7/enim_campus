import { useState, useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const [validationError,setValidationError]=useState({});

  const  validation= (credentials)=>{
      const errors={};
      if(!credentials.username){
        errors.username="username required"
      }else if(!credentials.password){
        errors.password="password required"
      }
      return errors;
    }

  const { user,loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
const location = useLocation();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
     e.preventDefault();
     const val=validation(credentials);
     setValidationError(val);
   
     if(!val.username && !val.password){

    
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      localStorage.setItem('state.user', JSON.stringify(res.data));
      sessionStorage.setItem('previousPath', location.pathname);
      if (location.state?.from){
           navigate (location.state.from);
      } else{
        navigate("/");
      }
      const { state } = location;
  const previousPath = state?.from || "/";
  navigate(previousPath);
    
      
      
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  };

  return (
    <div className="form-container">
      <form className="form-signin">
        <img
          className="mb-4"
          src="https://img.freepik.com/vecteurs-libre/homme-affaires-caractere-avatar-isole_24877-60111.jpg?w=2000"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="username" className="sr-only">
          Username
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="username"
          className="form-control"
          placeholder="Username"
          required
          autoFocus
        />
        {validationError.username && <p style={{color:"red",fontSize:"13px"}}>{validationError.username}</p>}

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          onChange={handleChange}
          type="password"
          id="password"
          className="form-control"
          placeholder="Password"
          required
        />
        {validationError.password && <p style={{color:"red",fontSize:"13px"}}>{validationError.password}</p>}

        <div className="mb-3">
          <Link to="/forgotPassword">
            <span onClick={()=>{dispatch({ type: "LOGIN_START" });}}>Forgot your password?</span>
          </Link>
        </div>
        <div className="mb-3">
          <Link to="/register">
            <span onClick={()=>{dispatch({ type: "LOGIN_START" });}}>You don't have an account, try to register?</span>
          </Link>
        </div>
        <button
          onClick={handleClick}
          className="btn btn-lg btn-primary btn-block form-control"
          type="submit"
        >
          Sign in
        </button>
        <div className="mb-3">
        {error && <p style={{color:"red",margin:"20px"}}>{error.message}</p>}
        </div>
        
        <p className="mt-5 mb-3 text-muted">&copy; Enim campus</p>
      </form>
    </div>
  );
};

export default Login;