import React, { useContext, useState } from "react";
import "./profile.css"
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Profile = () => {
  const { user ,loading, error, dispatch} = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [credentials, setCredentials] = useState({});
  const [validationError,setValidationError]=useState({});
  const [errorMessage,setErrorMessage]=useState("");
  const [successMessage,setSuccessMessage]=useState("");
  const [reloadKey, setReloadKey] = useState(0);


  const validation = (credentials) => {
    const errors = {};
    if(credentials.email){

    
    if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = "Invalid email format";
    }
  }
    return errors;
  };
  

  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
     e.preventDefault();
     
     
     const val=validation(credentials);
     setValidationError(val);
    
     if(!val.email){
     
    try {

    const data = new FormData();
     data.append("file",file);
     data.append("upload_preset","upload");
     let res;
     if(file){
      
      const uploadRes=axios.post("https://api.cloudinary.com/v1_1/dlvlxisrh/image/upload",data);
      const {url}=(await uploadRes).data;
      
      const newUser={
       ...credentials,
       img:url,
      }
      console.log(newUser)
      console.log(`/users/${user._id}`)
      res = await axios.put(`/users/${user._id}`, newUser);
     }else{
      console.log(`/users/${user._id}`)
      res = await axios.put(`/users/${user._id}`, credentials);
      
     }
     setSuccessMessage("Profile Updated");
     setErrorMessage("")
     dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
     setReloadKey(prevKey => prevKey + 1);
     window.scrollTo(0, 0);
    
    navigate("/profile")

      
    } catch (err) {
      setErrorMessage(err.response.data.message );
      setSuccessMessage("");
      setReloadKey(prevKey => prevKey + 1);
      window.scrollTo(0, 0);
     
     navigate("/profile")
    
    }
  };
};




  return (
    
    <div className="container profileContainer">
      <div className="view-account">
        <section className="module">
          <div className="module-inner">
          <div className="homeLink"> <Link to="/"><span to="">Enim Campus</span></Link></div>
         
            <div className="side-bar">
              <div className="user-info">
             
                <img
                  className="img-profile img-circle img-responsive center-block"
                  src={user.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                  alt=""
                />
                <ul className="meta list list-unstyled">
                  <li className="name">
                  {user.firstName}  {user.lastName}
                  </li>
                </ul>
              </div>

            </div>
            <div className="content-panel">
           
          {successMessage && <><div className="alert alert-info sm-gap big-zindex"  >{successMessage}</div></>}
          {errorMessage && <><div className="alert alert-danger sm-gap big-zindex"  >{errorMessage}</div></>}
              <h2 className="title">
                Profile
                
              </h2>
              <form className="form-horizontal">
                <fieldset className="fieldset">
                  <h3 className="fieldset-title">Personal Info</h3>
                  <div className="form-group avatar">
                    <figure className="figure col-md-2 col-sm-3 col-xs-12">
                      <img
                        className="img-rounded img-responsive"
                        src={user.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                        alt=""
                      />
                    </figure>
                    <div className="form-inline col-md-10 col-sm-9 col-xs-12">
                      <input
                        type="file"
                        
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                        className="file-uploader pull-left"
                      />
                      
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                      User Name
                    </label>
                    <div className="col-md-10 col-sm-9 col-xs-12">
                      <input
                      id="username"
                        type="text"
                        className="form-control"
                        placeholder={user.username}
                        onChange={handleChange}
                        autoComplete="off" 
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                    First Name
                    </label>
                    <div className="col-md-10 col-sm-9 col-xs-12">
                      <input
                       id="firstName"
                        type="text"
                        className="form-control"
                        placeholder={user.firstName}
                        onChange={handleChange}
                        autoComplete="off" 
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                      Last Name
                    </label>
                    <div className="col-md-10 col-sm-9 col-xs-12">
                      <input
                      id="lastName"
                        type="text"
                        className="form-control"
                        placeholder={user.lastName}
                        onChange={handleChange}
                        autoComplete="off" 
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                      Password
                    </label>
                    <div className="col-md-10 col-sm-9 col-xs-12">
                      <input
                      id="password"
                        type="password"
                        className="form-control"
                        onChange={handleChange}
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                </fieldset>
                <fieldset className="fieldset">
                  <h3 className="fieldset-title">Contact Info</h3>
                  <div className="form-group">
                    <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                      Email
                    </label>
                    <div className="col-md-10 col-sm-9 col-xs-12">
                      <input
                      id="email"
                        type="email"
                        className="form-control"
                        placeholder={user.email}
                        onChange={handleChange}
                        autoComplete="off" 
                      />
                      {validationError.email && <p style={{color:"red",fontSize:"13px"}}>{validationError.email}</p>}
                      <p className="help-block">This is the email</p>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                      Phone
                    </label>
                    <div className="col-md-10 col-sm-9 col-xs-12">
                      <input
                        id="phone"
                        type="text"
                        className="form-control"
                        placeholder={user.phone}
                        onChange={handleChange}
                        autoComplete="off" 
                      />
                      <p className="help-block">Your phone</p>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                      City
                    </label>
                    <div className="col-md-10 col-sm-9 col-xs-12">
                      <input
                      id="city"
                        type="text"
                        className="form-control"
                        placeholder={user.city}
                        onChange={handleChange}
                        autoComplete="off" 
                      />
                      <p className="help-block">Your city</p>
                    </div>
                  </div>
                  
                </fieldset>
                <hr />
                <div className="form-group">
                  <div className="col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0">
                    <input
                      className="btn btn-primary"
                      type="submit"
                      value="Update Profile"
                      onClick={handleClick}
                    />
                    
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
   
  );
};

export default Profile;
