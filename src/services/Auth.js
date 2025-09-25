// src/api/AuthService.js
import axios from 'axios';
const api_url = process.env.REACT_APP_API_URL;


axios.defaults.baseURL = api_url+'/api';
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

//---- REGISTER USER ---------------
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

//---- FORGOT PASSWORD ---------------
async function forgotPassword(data){
    try {
     var config = {
         method: 'post',
         url: '/v1/forgot-password',
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

//---- RESET PASSWORD ---------------
async function resetPassword(data){
    try {
     var config = {
         method: 'post',
         url: '/v1/reset-password',
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

export const Auth= { login, register, forgotPassword, resetPassword}