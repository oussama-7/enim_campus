import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Reset from "./pages/Reset/Reset";
import Profile from "./components/Profile/Profile";
import { AuthContext } from "./context/AuthContext";


function App() {
  const ProtectedRoute=({children}) =>{
    const {user}=useContext(AuthContext);
    if(!user){
      return <Navigate to="/login"/>
    }
    return children
  }
  return (

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
      
         <Route path="/login" element={<Login/>}/> 
         <Route path="/register" element={<Register/>}/> 
         <Route path="/forgotPassword" element={<Reset/>}/>
         <Route path="/profile" element={<ProtectedRoute>
          <Profile/>
            </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
