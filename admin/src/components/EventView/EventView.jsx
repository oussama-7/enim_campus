import React, { useContext, useEffect, useState } from "react";
import "./eventView.css"
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const EventView = () => {
  const [eventId, seteventId] = useState('');
  const [event, setEvent] = useState({});
  const {loading, error, dispatch} = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [credentials, setCredentials] = useState({});
  const [validationError,setValidationError]=useState({});
  const [errorMessage,setErrorMessage]=useState("");
  const [successMessage,setSuccessMessage]=useState("");
  const [reloadKey, setReloadKey] = useState(0);
  useEffect(() => {
    // Extract the event ID from the window link
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1);
    seteventId(id);

    // Make a GET request to fetch the event data using the extracted ID
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/events/find/${id}`);
        // Assuming the event data is returned in the response data
        const event = res.data;
        
        // Set the initial values for the input fields
        setEvent(event)
        
      } catch (err) {
        console.error(err);
      }
    };
    

    fetchEvent();
  }, []);
  console.log(event)

  // const validation = (credentials) => {
  //   const errors = {};
  //   if(credentials.email){

    
  //   if (!/\S+@\S+\.\S+/.test(credentials.email)) {
  //     errors.email = "Invalid email format";
  //   }
  // }
  //   return errors;
  // };
  

  
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: Array.isArray(prevCredentials[id]) ? [value] : value,
    }));
  };

  const handleClick = async (e) => {
     e.preventDefault();
     
     
    //  const val=validation(credentials);
    //  setValidationError(val);
    
    //  if(!val.email){
     
    try {

    const data = new FormData();
     data.append("file",file);
     data.append("upload_preset","upload");
     let res;
     if(file){
      
      const uploadRes=axios.post("https://api.cloudinary.com/v1_1/dlvlxisrh/image/upload",data);
      const {url}=(await uploadRes).data;
      
      const newEvent={
       ...credentials,
      photos:[url],
      }
      console.log(newEvent)
      console.log(`/events/${event._id}`)
      res = await axios.put(`/events/${event._id}`, newEvent);
     }else{
      console.log(`/events/${event._id}`)
      res = await axios.put(`/events/${event._id}`, credentials);
      
     }
     setSuccessMessage("Event Updated");
     setErrorMessage("")
     setEvent(res.data);
    
     setReloadKey(prevKey => prevKey + 1);
     window.scrollTo(0, 0);
    
    navigate(`/events/${event._id}`)

      
    } catch (err) {
      setErrorMessage(err.response.data.message );
      setSuccessMessage("");
      setReloadKey(prevKey => prevKey + 1);
      window.scrollTo(0, 0);
     
      navigate(`/events/${event._id}`)
    
    }
  // };
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
    
                  src={event.photos && event.photos[0] ? event.photos[0] : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
  
                  
                  alt=""
                />
                <ul className="meta list list-unstyled">
                  <li className="name">
                  {event.name}  
                  </li>
                </ul>
              </div>

            </div>
            <div className="content-panel">
           
          {successMessage && <><div className="alert alert-info sm-gap big-zindex"  >{successMessage}</div></>}
          {errorMessage && <><div className="alert alert-danger sm-gap big-zindex"  >{errorMessage}</div></>}
              <h2 className="title">
                Event
              </h2>
              <form className="form-horizontal">
                <fieldset className="fieldset">
                  <h3 className="fieldset-title">Event Info</h3>
                  <div className="form-group avatar">
                    <figure className="figure col-md-2 col-sm-3 col-xs-12">
                      <img
                        className="img-rounded img-responsive"
                        src={event.photos && event.photos[0] ? event.photos[0] : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
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
                      Name
                    </label>
                    <div className="col-md-10 col-sm-9 col-xs-12">
                      <input
                      id="name"
                        type="text"
                        className="form-control"
                        placeholder={event.name}
                        onChange={handleChange}
                        autoComplete="off" 
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                    Title
                    </label>
                    <div className="col-md-10 col-sm-9 col-xs-12">
                      <input
                       id="title"
                        type="text"
                        className="form-control"
                        placeholder={event.title && event.title[0]}
                        onChange={handleChange}
                        autoComplete="off" 
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                     Description
                    </label>
                    <div className="col-md-10 col-sm-9 col-xs-12">
                      <input
                      id="desc"
                        type="text"
                        className="form-control"
                        placeholder={event.desc && event.desc[0]}
                        onChange={handleChange}
                        autoComplete="off" 
                      />
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
                        placeholder={event.city}
                        className="form-control"
                        onChange={handleChange}
                        
                      />
                    </div>
                  </div>
                </fieldset>
                <fieldset className="fieldset">
                  <h3 className="fieldset-title">Info</h3>
                  <div className="form-group">
                    <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                      date
                    </label>
                    <div className="col-md-10 col-sm-9 col-xs-12">
                      <input
                      id="date"
                        type="text"
                        className="form-control"
                        placeholder={event.date}
                        onChange={handleChange}
                        autoComplete="off" 
                      />
                      
                      
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                      rating
                    </label>
                    <div className="col-md-10 col-sm-9 col-xs-12">
                      <input
                        id="rating"
                        type="text"
                        className="form-control"
                        placeholder={event.rating}
                        onChange={handleChange}
                        autoComplete="off" 
                      />
                      
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                      club
                    </label>
                    <div className="col-md-10 col-sm-9 col-xs-12">
                      <input
                      id="club"
                        type="text"
                        className="form-control"
                        placeholder={event.club}
                        onChange={handleChange}
                        autoComplete="off" 
                      />
                     
                    </div>
                  </div>
                  
                </fieldset>
                <hr />
                <div className="form-group">
                  <div className="col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0">
                    <input
                      className="btn btn-primary"
                      type="submit"
                      value="Update Event"
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

export default EventView;
