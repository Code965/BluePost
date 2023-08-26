import React from 'react';
import { useState, useEffect } from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios';

//CSS
import cssNavbar from './Css/Navbar.css'

//COMPONENTI
import { AuthContext } from './helpers/AuthContext';

//PAGINE
import './App.css';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registrazione from './pages/Registrazione';
import PaginaNonTrovata from './pages/PaginaNonTrovata'

import { BrowserRouter ,Route ,Routes} from 'react-router-dom'
import PersonalPage from './pages/PersonalPage';

function Navbar() {

    const [listOfPosts, setListOfPosts] = useState([]);
    const [authState, setAuthState] = useState({username:'', id:'', status:false});
    let navigate = useNavigate()
    
   
    const logout = () =>{
  
      localStorage.removeItem("Token");
      setAuthState({username:"",id:0, status:false});
      navigate('/login')
    }



  return (
    <div>
         <BrowserRouter>

<header id="navbar" className='flex-container '>
<ul id='nav-list' className='flex-container align-center justify-content '>

    
   
    {!authState.status ? (
    <>
      <Link to="/login"> Login</Link>
      <Link to="/Registrazione"> Registration</Link>

    </>
  ) : (   
          <>
          <li>  <Link to="/">Home</Link> </li>
          <li> <Link to="/Post">Crea un post</Link></li>
          <div className='center flex-container align-center '>
          
            <h1><Link to={`/paginaPersonale/${authState.id}`}> {authState.username} </Link></h1>
            <button onClick={logout}>Logout</button>
          </div>
          </>
        )}
</ul>


</header>
  
{/* Quello che faccio qui e` creae un ruotuer che mi indirizza ai componenti*/}
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/Post" element={<CreatePost/>} />
    <Route path="/Post/:id" element={<Post/>} />  
    <Route path="/Login" element={<Login/>} />  
    <Route path="/Registrazione" element={<Registrazione/>} />  
    <Route path="*" element={<PaginaNonTrovata/>} />  
    <Route path="/paginaPersonale/:id" element={<PersonalPage/>} />  

  </Routes>

</BrowserRouter>

      
    </div>
  )
}

export default Navbar
