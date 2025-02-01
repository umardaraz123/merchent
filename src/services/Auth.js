// src/api/AuthService.js
import axios from 'axios';
const api_url = process.env.NEXT_PUBLIC_API_URL;


// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = `https://mdeals.himalayatool.com/api`;
// axios.defaults.headers.common['Authorization'] = 'Bearer'+AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

//---- LOGIN USER ---------------
async function login(data){
    try {
     var config = {
         method: 'post',
         url: '/v1/login',
         headers:{
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          
        },
         data : data
       };
       
     return await axios(config)
       .then(function (response) {
         return response;
       })
       .catch(function (error) {
         return error.response
     });
    } catch (err) {
         return err.response
    }
}

//---- LOGIN USER ---------------
async function register(data){
    try {
     var config = {
         method: 'post',
         url: '/v1/register',
         headers:{
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          
        },
         data : data
       };
       
     return await axios(config)
       .then(function (response) {
         return response;
       })
       .catch(function (error) {
         return error.response
     });
    } catch (err) {
         return err.response
    }
}






export const Auth= { login,register}