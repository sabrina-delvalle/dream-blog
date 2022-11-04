import Header from '../components/header';
import Main from '../components/main';
import Aside from '../components/aside';
import Footer from '../components/footer';
//import React, {useState, useEffect} from 'react'
import '../App.css';

function Index() {
  /* const [backendData, setBackendData] = useState([{}]);

  useEffect( () => {
    fetch('/api')
        .then( response => response.json())
        .then(data => {
          console.log(data)
          setBackendData(data)
        })
  }, [])

  return(
    <div>
      {(typeof backendData.users === 'undefined') ? 
          (<p>loading...</p>) : (backendData.users.map((user, i) => {
              return <p key={i}>{user}</p>
      }))
      }
    </div>
  ) */

  return (
  <div>
    <Header/>
    <Aside/>
    <Main/>
    <Footer/>
  </div>
  );
}

export default Index;
