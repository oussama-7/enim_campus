import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Login/Login';

export default function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
const location = useLocation();

  // return user && user.isAdmin ? children : <Navigate to="/" replace state = {{from : location}} />;
  if (user && user.isAdmin) {
    return children;
  } else {
    if (location.state?.from && location.state.from !== "/admin/dashboard") {
      return (
        <>
          <p>You are not an admin.</p>
          <Navigate to="/" replace state={{ from: location }} />
        </>
      );
    } else {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
  }


}
