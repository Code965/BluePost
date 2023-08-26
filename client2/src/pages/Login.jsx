import React,{ useState ,useContext, useEffect } from 'react'
import {Formik,Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from 'axios';
import CssLogin from '../Css/Login.css'
import {useNavigate, Link} from 'react-router-dom'
import {AuthContext} from '../helpers/AuthContext'
import Home from './Home';

function Login() {

    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const { authState, setAuthState } = useContext(AuthContext);

   
    const login = ()=>{
        const data = {username:username, password:password};
        axios.post("http://localhost:3002/auth/login",data).then((response)=>{

              if (response.data.error)
              {
                alert(response.data.error);
              }else{
                localStorage.setItem("Token", response.data.token); //gli do il token che mi arriva da backend 
                setAuthState({username:response.data.username, id:response.data.id, status:true}); 
                navigate('/');
                window.history.go(0)
              }
            });
     } 

    const onChangeInptUsername = (event) =>{

      setUsername(event.target.value);
      
    }

    const onChangeInptPassword = (event) =>{

      setPassword(event.target.value);
      
    }

  return (
    <div>
          <Formik>
           
            <Form className="boxLogin flex-container align-center justify-content">
            
               
                <div className='wrapContainerLogin '>
                   <div className='barBoxLogin '>
                   </div>
                    <div className='titleBoxLogin flex-container justify-content'>
                       <h1>Accedi </h1>
                    </div>
                
                    <input  className='fieldLogin' type="text" id="inputUsername" placeholder="Username" name="username" onChange={onChangeInptUsername}/>

                    <br/>                    
                    <ErrorMessage name="username" component="span"/>

                    <input  className='fieldLogin' type="password"  id="inputPassword" placeholder="password" name="password" onChange={onChangeInptPassword} />

                    <br/>
                    <ErrorMessage name="password" component="span"/>

                    <div>
                      <button onClick={login}>Invia 
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
                          <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"/>
                        </svg> 
                      </button >  
                      <p  className='recLogin'> <Link className='link' to={'/lo'}>Recupera Password</Link> oppure <Link className='link' to={'/Registrazione'}> Iscriviti</Link></p>    
                    </div>
                </div>
            </Form>
          </Formik>

    </div>
  )
}

export default Login;