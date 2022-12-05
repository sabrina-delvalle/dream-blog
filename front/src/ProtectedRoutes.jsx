import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie'
//import { useState } from "react";
//import { UserContext } from './UserContext';
//import Index from "./Pages";
//import { useState } from "react";
//import axios from "axios";
//import Index from "./Pages";


function useAuth () {

 /*  let token = null; 

  console.log('before searching the token: ');
  fetch('http://localhost:5000/tokenvalidation', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('data retrieve in token for protected!: ', data);
    if(!data.name){
      return token = false
    }
    return token = true;
  })

  console.log('the token!! ', token); */

  return Cookies.get('userSession')
}

const ProtectedRoutes = () => {
  return (
    useAuth() === 'true' ? <Outlet/> : <Navigate to="/" replace />
  )
}

export default ProtectedRoutes; 