'use client';
import React ,{useState,useEffect} from 'react'


import { TiEyeOutline } from "react-icons/ti";
import { TicketsApi } from '../services/Tickets'
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Tickets = () => {
  const[loading,setLoading]=useState(false)
  const [list,setList]=useState([])
//getTickets
  async function getTicketsList() {
    setLoading(true);
  
    try {
        const result = await TicketsApi.getAllTickets()
        if(result.status == 200) {
          setLoading(false); 
          setList(result?.data?.data?.data)
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

  //delete ticket 
  async function deleteTicket(id) {
    setLoading(true);
  
    try {
        const result = await TicketsApi.deleteTicketApi(id)
       
        if(result.status == 200) {
          setLoading(false); 
          // setList(result?.data?.data?.data)
          toast.success("Ticket deleted successfuly",{
            autoClose:1000,
            pauseOnHover:true,
            draggable:true,
            
          });
           getTicketsList()
          
         }
        
        
        
    } catch (error) {
        console.log(error)
    }
     
  } 
  function handleDelete(recordId) {
    const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
    if (confirmDelete) {
      // Call the delete API or handle deletion logic
      deleteTicket(recordId);
    }
  }
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
      <th scope="col">Info</th>
      <th scope="col">Price</th>
      <th scope="col">Created</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {list?.map((ticket,index)=> <tr key={index}>
      <td>{index + 1}</td>
      <td>
        <div className="info">
          <div className="image-wrapper">
          <img src={ticket?.images[0]?.file_url} className='image' alt='image' fill />
          </div>
          <div className="data">
            <span className="title">
           {ticket?.title} {ticket?.category}
            </span>
          </div>
        </div>
      </td>
      <td>${ticket?.prices[0]?.price}</td>
      <td>{ticket?.created_at.slice(0,10)}</td>
      <td>
        <div className="actions">
          <Link to={`/admin/ticket-detail/${ticket?.guid}`} className="icon">
          {/* <Link  className="icon"> */}
          <TiEyeOutline />
          </Link>
          <Link to={`/admin/update-ticket/${ticket?.guid}`} className="icon">
          {/* <Link to=''  className="icon"> */}
          <CiEdit />
          </Link>
          <div className="icon" onClick={()=>handleDelete(ticket?.guid)}>
          {/* <div className='icon'> */}
          <MdDeleteOutline />
          </div>
        </div>
      </td>
    </tr> )}
   
   
    
  </tbody>
</table>
      </div>
     
    </div>
  )
}

export default Tickets