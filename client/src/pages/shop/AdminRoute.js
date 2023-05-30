import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  return user && user.isAdmin ? children : <Navigate to="/login" />;
}
