import React, { useContext,  useEffect,  useState } from 'react'
import './PlaceOrder.css'
import axios from 'axios';
import { StoreContext } from '../../components/Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function PlaceOrder() {
  
  const{getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext);
  const navigate = useNavigate();
  
  const [data,setData] =useState({
    firstName: "",
    lastName: "",
    email:"",
    city:"",
    street:"",
    phone:""
  })

  const onChangeHandler=(event) =>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const placeOrder = async (event) =>{
      event.preventDefault();
      let orderItems =[];
      food_list.map((item)=>{
        if (cartItems[item._id]>0) {
          let itemInfo = item;
          itemInfo["quantity"]=cartItems[item._id];
          orderItems.push(itemInfo);
        }
      })
      let orderData ={
        address :data,
        items:orderItems,
        amount:getTotalCartAmount()+2
      }
      let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
      if (response.data.success) {
          toast.success(response.data.message); 
          navigate('/home')

    }else{
      alert("error");
    }

}; 
useEffect(()=>{
  if (!token) {
    navigate('/cart')
  }
  else if(getTotalCartAmount()===0){
    navigate('/cart')
  }

},[token]);
  return (
    <div>
      <button onClick={()=>navigate('/cart') } className='back-btn'>
  <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
  <span>Back</span></button>
    <form onSubmit={placeOrder} className='place-order'  >
      <div class="place-order-left">
      <p class="title">Delivery Information</p>
      <div class="multi-fields">
        <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text"placeholder='First Name'/>
        <input required name='lastName' onChange={onChangeHandler }  value={data.lastName} type="text"placeholder='Last Name'/>
      </div>
      <input required name='email' onChange={onChangeHandler }  value={data.email} type="email" placeholder='Email ' />
      <input required name='city' onChange={onChangeHandler }  value={data.city} type="text"placeholder='City'/>
      <input required name='street' onChange={onChangeHandler }  value={data.street} type="text" placeholder='Street' />
      
    
      <input required  name='phone' onChange={onChangeHandler }  value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div class="place-order-right">
      <div className="cart-total">   
          <h2>Cart Totals</h2>
            <div class="cart-total-details">
              <p className='subtotal' >Subtotal</p>
              <p className='subtotal' >{getTotalCartAmount()} DZD</p>
            </div>
            <hr />
           
            <div class="cart-total-details">
              <p>Delivery fee</p>
              <p>{getTotalCartAmount()===0?0:2} DZD</p>
            </div>
            <hr />
            <div class="cart-total-details">
              <b>Total</b>
              <b>{ getTotalCartAmount()===0?0:getTotalCartAmount()+2} DZD</b>
            </div>
            <button type='submit'  > Order Now</button>
          </div>
      
      
      </div>
    </form  >
    </div>
  )
}

export default PlaceOrder
