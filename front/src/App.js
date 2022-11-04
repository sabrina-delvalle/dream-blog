import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Index from './Pages/index';
import Login from './Pages/login';
import Register from './Pages/register';
import Auth from './Pages/auth';
import Done from './Pages/registerDone'
import NotFound from './Pages/404_notfound';
import User from './Pages/user'
import Profile from './Pages/userprofile';
import PostPage from './Pages/new-post';

function App() {
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
    <Router>
      <Routes>
        <Route path='/' element={<Index/>} />
        <Route path='/new-post' element={<PostPage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/auth' element={<Auth/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/user/:id' element={<User />} />
        <Route path='/done' element={<Done />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
