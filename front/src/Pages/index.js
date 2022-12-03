import React, { useContext } from 'react';
import Header from '../components/header';
import Main from '../components/main';
import Aside from '../components/aside';
import Footer from '../components/footer';
import '../App.css';
import { UserContext } from '../UserContext';

function Index() {

  const { logUser, setLogUser } = useContext(UserContext);
  const user = {name: "Isis", lastname: "del Valle", _id: "9955378201"}

  return (
  <div>
    <Header/>
    <Aside/>
    {JSON.stringify(logUser, null, 2)}
    {!logUser ? 
      <button onClick={() => setLogUser(user)}>Login</button> 
      : 
      <button onClick={() => setLogUser(null)}>Logout</button>
    }
    <Main/>
    <Footer/>
  </div>
  );
}

export default Index;
