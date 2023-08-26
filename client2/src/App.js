import React from 'react';
import { useState, useEffect } from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios';

//CSS
import cssNavbar from './Css/Navbar.css'

//COMPONENTI
import { AuthContext } from './helpers/AuthContext';
import Footer from './Components/Footer';

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

function App() {
  

  const [authState, setAuthState] = useState({username:'', id:'', status:false});
  const [listOfPosts, setListOfPosts] = useState([]);
  
 
  useEffect(() => {
    axios
      .get("http://localhost:3002/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () =>{

    localStorage.removeItem("Token");
    setAuthState({username:"",id:0, status:false});
 
  }

  return (

    <AuthContext.Provider value={ {authState, setAuthState} }>
      <div className="App">
        {/* Racchiudo tutta la mia app */}
        <BrowserRouter>

          <header id="navbar" className='flex-container align-center spaceBetween '>
              <ul id='nav-list' className='flex-container align-center  '>

                  
                
                  {!authState.status ? (
                  <>
                    <div className='center3 flex-container align-center justify-content '>
                      <Link to="/login"> Login</Link>
                      <Link to="/Registrazione"> Registration</Link>
                    </div>

                  </>
                ) : (   
                        <>
                        <div className='center4 flex-container align-center spaceBetween'>

                          <div className='center2 flex-container align-center'>
                            <li>  <Link to="/">Home</Link> </li>
                            <li> <Link to="/Post">Crea un post</Link></li>
                          </div>
                        

                          <div className='center flex-container align-center '>
                            <h1><Link to={`/paginaPersonale/${authState.id}`}> {authState.username} </Link></h1>
                            <button onClick={logout}>Logout</button>
                          </div>
                          
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
    <Footer/>
    </div>

    </AuthContext.Provider>

  );
}

export default App;
