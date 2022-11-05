import React from "react";
import NavBar from "./navbar"
import axios from 'axios';
import { useState, useEffect } from "react";
//import { navigate } from "react-router-dom"
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';


export default function Header() {

  const [user, setUser] = useState(false);
  const [name, setName] = useState('Login');
  const [bearer, setBearer] = useState(undefined)
  
  useEffect( () => {
    async function retrieveToken(){
      /*axios.get('/token', {withCredentials: true}).then((res) => {
        console.log('axios', res.data)
      }) */  
      try{
/*         await fetch('http://localhost:5000/token', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          }
        }) */
        await axios.get('http://localhost:5000/token', {
          headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          }
        })
        .then(response => {
          console.log(response.data);
          console.log('previous token, ', response);
          if(response.data['token']) {
            setBearer(`Bearer ${response.data['token']}`)
          }
        })
        //.then(response => response.json())
/*         .then(data=>{
          console.log('previous token, ', data);
          if(data['token']) {
            setBearer(`Bearer ${data['token']}`)
          } */
        //console.log('token from API: ', token)
      }catch(err){
        console.log(err)
      }
    }
    retrieveToken()

    console.log('bearer, before get: ', bearer)
    
    if(bearer){
      console.log('its passing away');
      fetch('http://localhost:5000/user', {
       method: 'GET',
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json",
         "Authorization": bearer
       }
     })
     .then(response => response.json())
     .then(data => {
       //data.password = "";
       console.log('data retrieve: ', data);
       if(!data.name){
         return setUser(false)
       }
       setName(data.name.toUpperCase()[0] + data.name.slice(1))
       //console.log(name)
       setUser(true)
     })
    } 
  }, [user, name, bearer])

  const handleCookieDelete = () => {
    console.log('here handling cookie inside')
    axios.get('http://localhost:5000/clearcookie', {withCredentials: true})
      .then((res) => {
      console.log(res.data)
      document.location.reload() 
  })}


  const toRender = user ? <Logged name={name} setBearer={setBearer} clearCookie={handleCookieDelete}/> : <Login /> 
  return (
  <div>
    <div className="Header">
        <div className="log">
          {toRender}       
        </div>
    </div>
    <NavBar/>
  </div>
  )
}


function Login(props){
  return (
    <div>
      <a href="http://localhost:3000/login" className="log-link">login</a>/<a href="http://localhost:3000/register" className="log-link">Sign In</a>
    </div>
  )
}

function Logged(props){
  return (
  <div>
    <a href="http://localhost:3000/profile" className="log-link">Welcome, {props.name}</a>/<button className="logout-link" onClick={props.clearCookie}>log Out</button>
  </div>
  )
}