import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../components/Context/StoreContext'
import { food_list } from '../../assets/frontend_assets/assets';
import { useNavigate } from 'react-router-dom';
function Cart() {
  const {cartItems,food_list,removeFromCart,getTotalCartAmount,url}=useContext(StoreContext);

  const navigate= useNavigate();


  return (
    <div className='cart' >
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0){
            return (
              <div>
              <div className='cart-items-title cart-items-item'>
                 <img src={url+"/images/"+item.image} alt=""/>
                 <p>{item.name}</p>
                 <p>{item.price} DZD</p>
                 <p>{cartItems[item._id]}</p>
                 <p>{item.price*cartItems[item._id]} DZD </p>
                 <p onClick={()=>removeFromCart(item._id)} className='delete-btn'> <svg viewBox="0 0 15 17.5"  xmlns="http://www.w3.org/2000/svg" class="icon">
  <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
</svg></p>
              </div>
              <hr/>
              </div>
            )
          }
        })}
      </div>
      <div className='cart-buttom' >
        <div class="cart-total">   
          <h2>Cart Totals</h2>
            <div class="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} DZD </p>
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
            <button onClick={()=>navigate('/order')} > PROCEES TO CHECKOUT</button>
          </div>
      
      <div class="cart-promocode">
        <div>
          <p>If you have a promo code,Enter it here </p>
          <div className='cart-promocode-input'>
            <input type="text" placeholder='promo code'/>
            <button> Submit</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Cart
