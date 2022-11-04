//import Header from '../components/header';
//import Main from '../components/main';
//import Aside from '../components/aside';
//import Footer from '../components/footer';
//import React, {useState, useEffect} from 'react'
import '../App.css';

function User(){
    function handleAuth(){
        fetch('/user/:id', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlzaXM3NyIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjY0MDc0MTk3LCJleHAiOjE2NjQwNzQzNzd9.VU004vVE6dkWYAizxqr7K-op_TFoi_krE8Q5jo5SZZ0"
            }
        })
            .then(response => response.json())
            .then(data=>console.log(data))
    }
        return(<div>
            <h1>{handleAuth}</h1>
        </div>
        )
}
/* function Index() {
  return (
  <div>
    <Header/>
    <Aside/>
    <User />
    <Footer/>
  </div>
  );
} */


export default User;
