// src/api/AuthService.js
import axios from 'axios';
import { getFromCookies } from '../utils/cookieUtils';
const api_url = process.env.REACT_APP_API_URL;


const random_string_detail = getFromCookies();

axios.defaults.baseURL = api_url+'/api';
// axios.defaults.headers.common['Authorization'] = 'Bearer'+AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';
//Create ticket
async function createTicketApi(data) {
    try {
      const AUTH_TOKEN = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
         var config = {
             method: 'post',
             url: `/v1/tickets`,
             headers:{
              'Accept': 'application/json', 
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer '+AUTH_TOKEN
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
      return err
    }
  }
  async function updateTicketApi(id,data) {
    try {
      const AUTH_TOKEN = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
         var config = {
             method: 'post',
             url: `/v1/tickets/update/${id}`,
             headers:{
              'Accept': 'application/json', 
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer '+AUTH_TOKEN
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
      return err
    }
  }
  async function deleteTicketApi(id) {
    try {
      const AUTH_TOKEN = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
         var config = {
             method: 'post',
             url: `/v1/tickets/delete/${id}`,
             headers:{
              'Accept': 'application/json', 
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer '+AUTH_TOKEN
            },
             data : ''
         };
         
       return await axios(config)
         .then(function (response) {
           return response;
         })
         .catch(function (error) {
           return error.response
       });
    } catch (err) {
      return err
    }
  }

  async function getTickets() {
    try {
      const AUTH_TOKEN = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
         var config = {
             method: 'get',
             url: `/v1/tickets`,
             headers:{
              'Accept': 'application/json', 
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer '+AUTH_TOKEN
            },
             data : ''
         };
         
       return await axios(config)
         .then(function (response) {
           return response;
         })
         .catch(function (error) {
           return error.response
       });
    } catch (err) {
      return err
    }
  }
  async function getAllTickets() {
    try {
      const AUTH_TOKEN = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
         var config = {
             method: 'get',
             url: `/v1/get/tickets/deals`,
             headers:{
              'Accept': 'application/json', 
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer '+AUTH_TOKEN
            },
             data : ''
         };
         
       return await axios(config)
         .then(function (response) {
           return response;
         })
         .catch(function (error) {
           return error.response
       });
    } catch (err) {
      return err
    }
  }
  
  async function getTicketDetail(id) {
    try {
      const AUTH_TOKEN = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
         var config = {
             method: 'get',
             url: `/v1/tickets/${id}`,
             headers:{
              'Accept': 'application/json', 
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer '+AUTH_TOKEN
            },
             data : ''
         };
         
       return await axios(config)
         .then(function (response) {
           return response;
         })
         .catch(function (error) {
           return error.response
       });
    } catch (err) {
      return err
    }
  }
//public ticket detail
  async function getTicketDetailPublic(id) {
    try {
      const AUTH_TOKEN = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
         var config = {
             method: 'get',
             url: `/v1/ticket/detail/${id}`,
             headers:{
              'Accept': 'application/json', 
              'Content-Type': 'multipart/form-data',
              // 'Authorization': 'Bearer '+AUTH_TOKEN
            },
             data : ''
         };
         
       return await axios(config)
         .then(function (response) {
           return response;
         })
         .catch(function (error) {
           return error.response
       });
    } catch (err) {
      return err
    }
  }
  //public ticket detail
  async function getTicketsPublic() {

    const latitude = localStorage.getItem("latitude");
    const longitude = localStorage.getItem("longitude");

    try {
      const AUTH_TOKEN = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
         var config = {
             method: 'get',
             url: `/v1/home/page?latitude=${latitude}&longitude=${longitude}`,
             headers:{
              'Accept': 'application/json', 
              'Content-Type': 'multipart/form-data',
              // 'Authorization': 'Bearer '+AUTH_TOKEN
            },
             data : ''
         };
         
       return await axios(config)
         .then(function (response) {
           return response;
         })
         .catch(function (error) {
           return error.response
       });
    } catch (err) {
      return err
    }
  }
  //public ticket detail
  async function getTicketsPublicByCategory(category) {
    try {
      const AUTH_TOKEN = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
         var config = {
             method: 'get',
             url: `v1/getrecords/bycategories?category=${category}`,
             headers:{
              'Accept': 'application/json', 
              'Content-Type': 'multipart/form-data',
              // 'Authorization': 'Bearer '+AUTH_TOKEN
            },
             data : ''
         };
         
       return await axios(config)
         .then(function (response) {
           return response;
         })
         .catch(function (error) {
           return error.response
       });
    } catch (err) {
      return err
    }
  }


  async function checkout(data) {
    try {
      const AUTH_TOKEN = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
         var config = {
             method: 'post',
             url: `/v1/create-checkout-session?random_string=${random_string_detail.uniqueString}`,
             headers:{
              'Accept': 'application/json', 
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer '+AUTH_TOKEN
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
      return err
    }
  }

  async function verifyPayment(session_id) {
    try {
      const AUTH_TOKEN = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
         var config = {
             method: 'get',
             url: `/v1/verify-payment?session_id=${session_id}`,
             headers:{
              'Accept': 'application/json', 
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer '+AUTH_TOKEN
            }
         };
         
       return await axios(config)
         .then(function (response) {
           return response;
         })
         .catch(function (error) {
           return error.response
       });
    } catch (err) {
      return err
    }
  }

  

  async function enquiryApi(data) {
    try {
      const AUTH_TOKEN = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
         var config = {
             method: 'post',
             url: `/v1/enquiry_form`,
             headers:{
              'Accept': 'application/json', 
              'Content-Type': 'application/json',
              // 'Authorization': 'Bearer '+AUTH_TOKEN
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
      return err
    }
  }

export const TicketsApi= { createTicketApi,getTickets,getAllTickets,getTicketDetail,getTicketDetailPublic,getTicketsPublic,updateTicketApi,deleteTicketApi,getTicketsPublicByCategory, checkout, verifyPayment,enquiryApi}