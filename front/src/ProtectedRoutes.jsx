import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie'
//import { useState } from "react";
//import { UserContext } from './UserContext';
//import Index from "./Pages";
//import { useState } from "react";
//import axios from "axios";
//import Index from "./Pages";


function useAuth () {
  return Cookies.get('userSession')
}

const ProtectedRoutes = () => {
  return (
    useAuth() === 'true' ? <Outlet/> : <Navigate to="/" replace />
  )
}

export default ProtectedRoutes; 