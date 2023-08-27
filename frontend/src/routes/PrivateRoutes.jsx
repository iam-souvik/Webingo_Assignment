import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
     const user = JSON.parse(localStorage.getItem("USER"));


     if (user?.token) return children;
     return <Navigate to="/login" />

}

export default PrivateRoute;