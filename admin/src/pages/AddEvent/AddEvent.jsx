import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./addEvent.css";
import { Link } from "react-router-dom";

const AddUser = () => {
  const[error,setError]=useState("");
    const [file, setFile] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    club: "",
    desc:[],
    title:[],
    rating:0,
    photos:[],
    city:"",
    date:""

  });
  const [validationError,setValidationError]=useState({});
  const [successMessage,setSuccessMessage]=useState("");

  const validation = (credentials) => {
    const errors = {};
  
    if (!credentials.desc) {
      errors.desc = "desc is required";
    } else if (!credentials.title) {
      errors.title = "title is required";
    } else if (!credentials.name) {
      errors.name = "name is required";
    } else if (!credentials.rating) {
      errors.rating = "rating is required";
    } else if (!credentials.city) {
      errors.city = "City is required";
    } else if (!credentials.club) {
      errors.club = "club is required";
    }
  
    return errors;
  };
  

 
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
    

     const val=validation(credentials);
     setValidationError(val);
     console.log(credentials)
     if(!val.desc && !val.title && !val.name && !val.rating && !val.city && !val.city && !val.club ){

    
    setError("")
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
        photos:url,
       }
         console.log(credentials) 
         console.log(newEvent) 
      res = await axios.post("/events", newEvent);
     
     }else{
      res = await axios.post("/events", credentials);
      
     }
     
       
       
     setSuccessMessage("Successfully Added! ");
      
     
    } catch (err) {
      setError(err.response.data);
    
    }
  };
  };

  return (
    <div className="form-container ">
      <form className="form-signup">
        <img
          className="mb-4"
          src="https://img.freepik.com/vecteurs-libre/homme-affaires-caractere-avatar-isole_24877-60111.jpg?w=2000"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Add Event</h1>
        <div className="row">
        <div className="col-lg-6">
        <label htmlFor="desc" className="sr-only">
          Description
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="name"
          className="form-control"
          placeholder="Name"
          required
         
          autoComplete="off" 
        />
        {validationError.desc && <p style={{color:"red",fontSize:"13px"}}>{validationError.desc}</p>}
        </div>
        <div className="col-lg-6">
        <label htmlFor="title" className="sr-only">
        Title
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="title"
          className="form-control"
          placeholder="Title"
          required
          
          autoComplete="off" 
        />
        {validationError.title && <p style={{color:"red",fontSize:"13px"}}>{validationError.title}</p>}
        </div>
        </div>
        <div className="row">
        <div className="col-lg-6">
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="desc"
          className="form-control"
          placeholder="Description"
          required
          autoFocus
          autoComplete="off" 
        />
        
        {validationError.name && <p style={{color:"red",fontSize:"13px"}}>{validationError.name}</p>}
        </div>
        <div className="col">
        <label htmlFor="rating" className="sr-only">
          rating
        </label>
        <input
          onChange={handleChange}
          type="rating"
          id="rating"
          className="form-control"
          placeholder="Rating"
          required
          
          autoComplete="off" 
        />
        {validationError.rating && <p style={{color:"red",fontSize:"13px"}}>{validationError.rating}</p>}
        </div>
        </div>
        <div className="row">
        <div className="col-lg-6">
        
        <label htmlFor="city" className="sr-only">
          City
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="city"
          className="form-control"
          placeholder="City"
          required
          
          autoComplete="off" 
        />
        {validationError.city && <p style={{color:"red",fontSize:"13px"}}>{validationError.city}</p>}
        </div>
        <div className="col-lg-6">
        <label htmlFor="date" className="sr-only">
          date
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="date"
          className="form-control"
          placeholder="Date"
          required
          
          autoComplete="off" 
        />
       
        </div>
        </div>
        <div className="row">
        <div className="col-lg-6">
        
        <div className="custom-file form-control">
  <input  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}  className="custom-file-input"  />
  <label className="custom-file-label" htmlFor="customFile">Image </label>
</div></div>
       
        <div className="col-lg-6">
        <label htmlFor="club" className="sr-only">
          club
        </label>
        <input
          onChange={handleChange}
          type="club"
          id="club"
          className="form-control"
          placeholder="Club"
          required
          autoComplete="new-club"
        />
        {validationError.club && <p style={{color:"red",fontSize:"13px"}}>{validationError.club}</p>}
</div></div>
       
        
        <button
          onClick={handleClick}
          className="btn btn-lg btn-primary btn-block"
          type="submit"
        >
          Add
        </button>
        
        <div className="mb-3">
        {error && <p style={{color:"red",margin:"20px"}}>{error.message}</p>}
        {successMessage && <><div  style={{margin:"20px"}} className="alert alert-info sm-gap big-zindex"  >{successMessage}  </div></>}
        </div>
        
        <p className="mt-5 mb-3 text-muted">&copy; Enim campus</p>
      </form>
    </div>
  );
};

export default AddUser;
