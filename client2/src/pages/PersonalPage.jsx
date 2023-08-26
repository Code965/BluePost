import axios from 'axios'
import React, {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

import ProfilePage from '../Css/ProfilePage.css'

function PersonalPage() {
  
  const [utente,setUtente] = useState({});
  const [post,setPost] = useState([]);
  const {authState,setAuthState } = useContext(AuthContext)
  let {id} = useParams();

  useEffect(() => {

    axios.get(`http://localhost:3002/auth/ottieniUtenti/${id}`,).then((response)=>{
      
      console.log(utente);
      setUtente(response.data); //li memorizza dentro lo stato
     
    });

    axios.get(`http://localhost:3002/posts/byuserId/${id}`,).then((response)=>{
      
      console.log('postProfile' + response.data);
      setPost(response.data); //li memorizza dentro lo stato
     
    });


  }, [])
  


  return (
  <div className='ProfilePageContainer flex_container align_center justify_content'>

    <div className='ProfilePageItems flex_container align_center justify_content '>
          
          <div className="foto flex_container align_center justify_content">
           <img src="https://www.html.it/wp-content/uploads/2006/03/logo.gif"/>
          </div>

          <div className="info flex_container align_center justify_content">
          <h1>{authState.username}</h1>

            <div className='flex_container'>
            <li>marco.rossi@gmail.com</li>
            <li>Italia</li>
            <li>Modena</li>
            </div>

            <div className='flex_container'>
            <li>marco.rossi@gmail.com</li>
            <li>Italia</li>
            <li>Modena</li>
            </div>
            <div className='flex_container'>
            <li>marco.rossi@gmail.com</li>
            <li>Italia</li>
            <li>Modena</li>
            </div>
            <div className='flex_container'>
            <li>marco.rossi@gmail.com</li>
            <li>Italia</li>
            <li>Modena</li>
            </div>
           
          </div>
      
    </div>

    <div className='ProfilePageItems flex_container align_center justify_content '>
      <h1> Articoli {utente.username}</h1>
    </div>


    <div className='ProfilePageItems flex_container align_center justify_content '>
      {post.map((value,key)=>{
        return (
          <div className="cardPost flex_container align_center justify_content">
            <div className='profileImg flex_container align_center justify_content'>esempio </div>
            <div className='profileText'>
              {value.postText}
              <p className='textProfile'>leggi altro cliccando qui</p>
              </div>
            <div className='profileUser flex_container'>
              {value.username}
            <div className="boxButton">
            <button> back</button>
              <button>next</button>

            </div>
             
            </div>
  
        </div>
        )
      })}
     
    </div>

    
  </div>
     
  )
}

export default PersonalPage