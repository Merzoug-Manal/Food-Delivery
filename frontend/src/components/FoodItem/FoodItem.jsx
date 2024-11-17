import React, { useContext, useState } from 'react'
import'./FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../Context/StoreContext';
function FoodItem({id,name,price,description,image} ) {

    const [itemCount,setItemCount]=useState(0);
    const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext);

  return (
    <div className='food-item' >
      <div class="food-item-img-container">
        <img className='food-item-image' src={url+"/images/"+image} alt=""/>
        { !cartItems[id]
             ?<img  className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} />
             :<div className='food-item-counter' >
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt=""/>
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt=""/>
             </div>
        }
      </div>
      <div class="food-item-in">
        <div class="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p class="food-item-desc">{description}</p>
        <p class="food-item-price">{price} DZD </p>
      </div>
    </div>
  )
}

export default FoodItem
