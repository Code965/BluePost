import React from 'react'
import {Formik,Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from 'axios';
import CssRegistrazione from '../Css/Registrazione.css'

function Registrazione() {

    const onSubmit = (data)=>{


        console.log(data);
        axios.post("http://localhost:3002/auth/inserisciUtente",data).then((response)=>{

              alert(response.data);
        });

    }

    const initialValues = {
        username:'',
        password:''
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().max(15).min(3).required("campo necessario"),
        password: Yup.string().max(10).min(3).required("campo necessario")
    });

  return (
    <div>
          <Formik  initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
           
            <Form className="boxRegistrazione flex-container align-center justify-content"> 
            
               
                <div className='wrapContainer '>
                   <div className='barBox '>
                   </div>
                    <div className='titleBox flex-container justify-content'>
                       <h1>Registrati</h1>
                    </div>
                
                    <Field className='field' type="text" id="inputUsername" placeholder="Username" name="username" />

                    <br/>
                    <ErrorMessage name="username" component="span"/>

                    <Field className='field' type="password"  id="inputPassword" placeholder="password" name="password" />

                    <br/>
                    <ErrorMessage name="password" component="span"/>

                    <div>
                      <button>Registrati 
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

export default Registrazione;
