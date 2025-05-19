import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TicketsApi } from '../services/Tickets';
import { BsCalendar2Date } from "react-icons/bs";

const OrderDetails = () => {
    
      const { oid } = useParams();
      const[orderDetail,setOrderDetail]=useState([])
      const [loading, setLoading] = useState(false);
        useEffect(() => {
          const fetchTicketDetail = async (oid) => {
            setLoading(true);
            try {
              const res = await TicketsApi.getOrderDetail(oid);
              if (res.status === 200) {
                const detail = res.data?.data;
                console.log("detail",detail)
      
               setOrderDetail(detail)
      
                
              }
            } catch (error) {
              console.error('Failed to fetch ticket detail', error);
            } finally {
              setLoading(false);
            }
          };
      
          fetchTicketDetail(oid);
        }, [oid]);
  return (
    <>{loading && <div className='main-loader'>
            <div className="spinner"></div>
            </div>}
            
             <div className='order-detail'>
              <div className="row">
               
                <div className="col-12 col-md-6">
                    <div className="item">
                        <div className="name">
                            Date:
                        </div>
                        <div className="value">
                           {orderDetail?.created_at?.substring(0,10)}
                        </div>
                    </div>
                </div>
                 <div className="col-12 col-md-6">
                    <div className="item">
                        <div className="name">
                            Customer Name:
                        </div>
                        <div className="value">
                           {orderDetail?.customer?.first_name} {orderDetail?.customer?.last_name}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="item">
                        <div className="name">
                            Customer Phone:
                        </div>
                        <div className="value">
                           {orderDetail?.customer?.phone_number} 
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="item">
                        <div className="name">
                        Customer Address:
                        </div>
                        <div className="value">
                           {orderDetail?.customer?.address_line1} {orderDetail?.customer?.address_line2}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="item">
                        <div className="name">
                            City:
                        </div>
                        <div className="value">
                           {orderDetail?.customer?.city} 
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="item">
                        <div className="name">
                            Country:
                        </div>
                        <div className="value">
                           {orderDetail?.customer?.country} 
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <h2 className="title">
                        Number of Items : {orderDetail?.order_items?.length}
                    </h2>
                    <ul>
                        {orderDetail?.order_items?.map((item)=> <li>
                          <span className="name">
                            {item?.product_name}
                          </span>
                          <span className="price">
                           $ {item?.price}
                          </span>

                        </li>)}
                    </ul>
                </div>
                <div className="col-12 col-md-6">
                    <div className="item">
                        <div className="name">
                            Discount:
                        </div>
                        <div className="value">
                          $ {orderDetail?.promo_discount} 
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="item">
                        <div className="name">
                            Service Fee:
                        </div>
                        <div className="value">
                          $ {orderDetail?.service_fee} 
                        </div>
                    </div>
                </div>
                 <div className="col-12 col-md-6">
                    <div className="item">
                        <div className="name">
                            Sub Total:
                        </div>
                        <div className="value">
                          $ {orderDetail?.subtotal} 
                        </div>
                    </div>
                </div>
                 <div className="col-12 col-md-6">
                    <div className="item">
                        <div className="name">
                            Total Amount:
                        </div>
                        <div className="value">
                          $ {orderDetail?.total} 
                        </div>
                    </div>
                </div>
              </div>
        
        </div>
            </>
   
  )
}

export default OrderDetails