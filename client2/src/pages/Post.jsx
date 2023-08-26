import React from 'react'
import {useNavigate, useParams} from 'react-router-dom'; //lo importo
import {useEffect, useState} from 'react'
import axios from 'axios';
import post  from '../Css/RecevingPost.css'
import { AuthContext } from '../helpers/AuthContext';

import {Formik, Form, Field, ErrorMessage} from 'formik';
import { useContext } from 'react';

function Post(props) {
  

let { id } = useParams(); 
let navigate = useNavigate();
  
const [post, setPost] = useState([])

const [commenti, setCommenti] = useState([]);

const [newComment, setNewComment] = useState([]);

const {authState, setAuthState} = useContext(AuthContext)


const onStato = (event)=>{setNewComment(event.target.value)}


const eliminaCommento = (data)=>{
  axios.delete(`http://localhost:3002/commenti/eliminaCommenti/${data}`,{
    headers: {accessToken: localStorage.getItem("Token")}
  }).then((response)=>{

    setCommenti(
      commenti.filter((val)=>{
          return val.id != data
    }) 
    );
  });
}

const eliminaPost = (data)=>{
  axios.delete(`http://localhost:3002/posts/eliminaPost/${data}`,{

    headers: {accessToken: localStorage.getItem("Token"),
  }
  }).then((response)=>{
      navigate('/')

  });
}

const addComment = () =>{
  axios.post("http://localhost:3002/commenti/inserisciCommento", {

        commentBody:newComment,
        postId:id,
  }, 
  {
    headers: {
      accessToken: localStorage.getItem("Token"),
    },
  }).then((response)=>{

    if(response.data.error){

      alert(response.data.error);

    }else {

          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };

          setCommenti([...commenti, commentToAdd]);
          setNewComment("");
          window.history.go(0);
        }
   
  });
}

useEffect(() => {

    axios.get(`http://localhost:3002/posts/mostraPost/${id}`).then((response)=>{

    //la pagina post deve mostrare un certo tipo di post, quindi prendo l'id dalla url e faccio una get

            console.log(response.data);
            setPost(response.data);
    });

    axios.get(`http://localhost:3002/commenti/mostraCommenti/${id}`).then((response)=>{

            console.log(response.data);
            setCommenti(response.data);
    });

    }, []);



    //POST COMMENTO


  return (
    <div className='flex-container  '>
        <div className='postC justify-content align-center flex-container'>

            <div className='itemsC'>
            
              <div className='nav-postC flex-container justify-content align-center'>
                  <h1>{post.title}</h1>
              </div>

              <div className='post-centerC flex-container justify-content align-center'>
                  <ul className='listC'>
                  <li>{post.postText}</li>
                  </ul>
              </div>
              <div className='username-postC align-center spaceBetween flex-container '>
                  <h1 onClick={()=>{navigate(`/paginaPersonale/${authState.id}`)}} className='text'>{post.username}  
                 
                  </h1> 

                  { authState.username === post.username && (<button onClick={()=>{eliminaPost(post.id)}} className='btnC'>Cancella</button>)}
              </div>
            </div>
        </div>

        
        <div className='commenti flex-container jutify-content  '>
          {/* Qui metto di inserire un commento */}

              <div className='boxInput flex-container justify-content  '>
               
                    <div>

                      <input className='inpt' value={newComment} onChange={onStato} type="textarea" name="commentBody"  id="inputComment" placeholder="Commento" />
                      <button onClick={()=>{addComment()}}>Aggiungi</button>

                    </div>
                  
              </div>

              <h1 className='textTitle flex-container'>COMMENTI</h1>


               <div className='boxComment flex-container '>

                  <div className='textC'>

                    
                      {commenti.map((comment,key)=>{

                            return (
                              <>
                                <label className='labelPost flex-container'>{comment.username}</label>
                                <div className='commentSection flex-container'> {comment.commentBody}
                                
                                {authState.username === comment.username && (<button className='deleteBottom' onClick={()=>{eliminaCommento(comment.id)}}>elimina</button>)}
                                {authState.username === comment.username && (<button className='deleteBottom' onClick={()=>{eliminaCommento(comment.id)}}>modifica</button>) } 
                                </div>
                              </>
                              );
                              
                            
                          })}
                  </div>
                </div>

        </div>
      
        
      </div>
         
  )
}

export default Post