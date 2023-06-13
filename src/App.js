import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Reset from './pages/Reset/Reset';
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import Profile from "./components/Profile/Profile";
import EventView from "./components/EventView/EventView";
import New from "./pages/new/New";
import AddUser from "./pages/AddUser/AddUser";
import AddEvent from "./pages/AddEvent/AddEvent";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { eventInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import {  useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { courseColumns, eventColumns, productColumns, userColumns } from "./datatablesource";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const ProtectedRoute=({children}) =>{
    const {user}=useContext(AuthContext);
    if(!user){
      return <Navigate to="/login"/>
    }
    return children
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="/forgotPassword" element={<Reset />} />
            <Route index element={<ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
           
            <Route path="users">
              <Route index element={<ProtectedRoute>
              <List columns={userColumns}/>
            </ProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute>
              <Profile />
            </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute>
             <AddUser />
            </ProtectedRoute>}
              />
            </Route>
            
            <Route path="events">
              <Route index element={<ProtectedRoute>
              <List columns={eventColumns}/>
            </ProtectedRoute>} />
              <Route path=":eventId" element={<ProtectedRoute>
             <EventView />
            </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute>
               <AddEvent />
            </ProtectedRoute>}
              />
            </Route>
           
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
