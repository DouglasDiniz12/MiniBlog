import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'

import { AuthProvide } from './context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';


//HOOKS
import { useState,useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';


import './App.css';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './componente/Navbar';
import Footer from './componente/Footer';
import Login from './pages/login/Login';
import Register from './pages/registre/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import EditePost from './pages/EditePost/EditePost'


//pages

function App() {

  const [user, setUser] = useState(undefined)
  const{auth} = useAuthentication()

  const loadingUser = user === undefined
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  },[auth])

if(loadingUser){
  return <p>Carregando...</p>
}


  return (
    <div className="App">
      <AuthProvide value={{user}}>
     <BrowserRouter>
     <Navbar/>
      <div className="container">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/posts/:id' element={<Post/>}/>
          <Route path='/login' element={!user ? <Login/>: <Navigate to="/"/>}/>
          <Route path='register' element={!user ? <Register/>: <Navigate to="/"/>}/>
          <Route path='posts/edit/:id' element={user ? <EditePost/>: <Navigate to="/"/>}/>
          <Route path='/posts/create' element={user ? <CreatePost/>: <Navigate to="/login"/>}/>
          <Route path='/dashboard' element={user ? <Dashboard/>: <Navigate to="/login"/>} />
            {}
        </Routes>
      </div>
      <Footer/>
     </BrowserRouter>
     </AuthProvide>
    
    </div>
  );
}

export default App;
