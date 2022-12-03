import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from './UserContext';
//import { useState } from "react";
//import axios from "axios";
//import Index from "./Pages";


const useAuth = () => {
  const { logUser, setLogUser } = useContext(UserContext);
  console.log("what the hell is LOGUSER! ", logUser);
  return logUser
}

const indexReturn = () => {
  return document.location.replace('/')
}

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return (
    isAuth ? <Outlet/> : indexReturn()
  )
}

export default ProtectedRoutes; 