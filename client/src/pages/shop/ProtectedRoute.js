import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  return user ? children : <Navigate to="/"  replace state = {{from : location}} />; 
}
