import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const NewCourse= ({ inputs, title }) => {
  const [files, setFiles] = useState("");
  const [info , setInfo]=useState({});
   const handleChange= e=>{
    setInfo(prev=>({...prev,[e.target.id]:e.target.value}))
   };
   const handleClick=async e=>{
    e.preventDefault();
    const data = new FormData();
    data.append("file",files);
    data.append("upload_preset","upload");
    try{

      const uploadRes=axios.post("https://api.cloudinary.com/v1_1/dlvlxisrh/image/upload",data);
     const {url}=(await uploadRes).data;
     
     const newUser={
      ...info,
      img:url,
     }
     console.log(newUser)
     await axios.post("/auth/register",newUser);
   

    }catch(err){
      console.log(err)
    }

   }
   
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  multiple
                  type="file"
                  id="file"
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                  
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange} />
                </div>
              ))}
              <button onClick={ handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCourse;
