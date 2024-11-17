import React, { useEffect, useState } from 'react'
import './Orders.css'
import {toast} from "react-toastify"
import axios from "axios"
import {assets} from "../../assets/assets"
function Orders({url}) {
  
  const [orders,setOrders]=useState([]);
  const fetchAllOrders = async ()=>{
    const response = await axios.get(url+"/api/order/list")
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }
  const statusHandler = async (event,orderId)=>{
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }
useEffect(()=>{
fetchAllOrders();
},[])


  return (
    <div className='order add' >
    <h3>Order Page</h3>    
    <div class="order-list">
      {orders.map((order,index)=>(
        <div key={index} className='order-item' >
          <img src={assets.parcel_icon}/>
          <div>
            <p className='order-item-food' >
              {order.items.map((item,index)=>{
                if (index===order.items.length -1) {
                  return item.name + 'x'+item.quantity
                  
                }else{
                  return item.name + 'x' + item.quantity+','
                }
              })}
            </p>
            <p className='order-item-name' >
              {order.address.firstName+" "+order.address.lastName}
            </p>
            <div class="order-item-address">
              <p>{order.address.city+","}</p>
              <p>{order.address.street+","}</p>
            </div>
            <div class="order-item-phone">{order.address.phone}</div>
          </div>
          <p>Items: {order.items.length}</p>
          <p>{order.amount}DZD </p>
          <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} >
            <option value="Food Processing">Food Processing</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
          </div>
      ))}
      </div>  
    </div>
  )
}

export default Orders
