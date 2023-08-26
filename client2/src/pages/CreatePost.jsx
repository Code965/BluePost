import React, {useContext, useEffect} from 'react';
import '../Css/CreatePost.css'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'; 
import axios from 'axios';
import {AuthContext} from '../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';


function CreatePost() {

  const {authState} = useContext(AuthContext);
  let navigate =  useNavigate();
  //Questo mi serve per avere i valori che devo fornire tramite il modulo
  const initialValues ={
    title:'',
    postText:'',
  }; 

  //mi controlla i vari campi
  //string() perche` e` una stringa
  //required() richiesto
  //max e min valore massimo e minimo ammesso
  const validationSchema = Yup.object().shape({
    title:Yup.string().min(3).required("campo obbligatorio"),
    postText: Yup.string().required(),

  });

  //mi invia i dati del modulo
  const onSubmit = (data)=>{
    console.log(data);

    //praticamente questa axios prende un oggetto che passa, ovvero data
    axios.post('http://localhost:3002/posts/aggiungiPost',data,{
      headers:{accessToken:localStorage.getItem("Token")}
    }).then((response)=>{
        alert('Post Registrato');
    });
  }

  useEffect(() => {

    if(!localStorage.getItem("Token")){
      navigate('/login');
    }
   
  }, [])
  



  return (
    <div>
    <Formik  initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
     
      <Form className="boxRegistrazione flex-container align-center justify-content"> 
      
         
          <div className='wrapContainer '>
             <div className='barBox '>
             </div>
              <div className='titleBox flex-container justify-content'>
                 <h1>Scrivi un post</h1>
              </div>
          
              <Field className='field' type="text" id="inputTitle" placeholder="Titolo" name="title" />

              <br/>
              <ErrorMessage name="title" component="span"/>

              <Field className='field' as="textarea"  id="inputPostText" placeholder="Corpo" name="postText" />

              <br/>
              <ErrorMessage name="postText" component="span"/>

              <div>
                <button>Crea
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
                    <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"/>
                  </svg> 
                </button>      
              </div>
          </div>
      </Form>
    </Formik>

</div>
  )
}

export default CreatePost
