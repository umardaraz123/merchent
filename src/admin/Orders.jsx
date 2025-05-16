'use client';
import React ,{useState,useEffect} from 'react'


import { TiEyeOutline } from "react-icons/ti";
import { TicketsApi } from '../services/Tickets'
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import noImage from '../images/no-image.jpg';
import { ImageWithFallback } from '../utils/imageUtils';

const Orders = () => {
  const[loading,setLoading]=useState(false)
  const [list,setList]=useState([])
//getTickets
  async function getTicketsList() {
    setLoading(true);
  
    try {
        const result = await TicketsApi.getAdminOrders()
        if(result.status == 200) {
          console.log(result?.data?.data)
          setLoading(false); 
          setList(result?.data?.data)
          toast.success("Record fetched successfuly",{
            autoClose:1000,
            pauseOnHover:true,
            draggable:true,
            
          });
           
          
         }
        
        
        
    } catch (error) {
        console.log(error)
    }
     
  } 


  useEffect(()=>{
    getTicketsList()
  },[])

 

  return (
    <div className='ticket-wrapper'>
         <ToastContainer />
        {loading && <div className='main-loader'>
            <div className="spinner"></div>
            </div>}
      <div className="table-responsive">
      <table className="table">
  <thead>
    <tr>
      <th scope="col">Ticket #</th>
      <th scope="col">Customer</th>
        <th scope="col">Phone</th>
      <th scope="col">Number of items</th>
      <th scope="col">Totla price</th>
     
    </tr>
  </thead>
  <tbody>
    {list?.map((order,index)=> <tr key={index}>
      <td>{index + 1}</td>
      <td>
        {order?.customer?.first_name} {order?.customer?.last_name}
      </td>
      
      <td>
        {order?.customer?.phone_number}
      </td>
       <td>
        {order?.order_items?.length}
      </td>
        <td>
        {order?.total}
      </td>
      
     
    </tr> )}
   
   
    
  </tbody>
</table>
      </div>
     
    </div>
  )
}

export default Orders