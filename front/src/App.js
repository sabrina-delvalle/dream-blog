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
import PostID from './Pages/post';

function App() {
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
        <Route path='/post/:id' element={<PostID />} />
        <Route path='/done' element={<Done />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
