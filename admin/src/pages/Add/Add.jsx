import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
function Add({url}) {

    
   const [image,setImage] = useState(false) 
   const [data,setData]=useState({
    name:"",
    description:"",
    price:"",
    category:"Salad",
   })

   const onSubmitHandler=async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("price",Number(data.price));
    formData.append("category",data.category);
    formData.append("image",image);
    const response = await axios.post(`${url}/api/food/add`,formData)
    if(response.data.success){
        setData({
            name:"",
            description:"",
            price:"",
            category:"Salad",
        })
        setImage(false);
        toast.success(response.data.message);
    }
    else {
        toast.error(response.data.message);  
    }
   }

   const onChangeHandler= (event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
   }

   

  return (
    <div className='add' >
        <form className='flex-col' onSubmit={onSubmitHandler} >
        <div class="add-img-upload flex-col ">
            <p>Upload Image</p>
            <label htmlFor='image' >
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt=""/>
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type='file' id="image" hidden required />
        </div>
        <div class="add-product-name flex-col ">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div class="add-product-description flex-col ">
            <p>Product description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required ></textarea>
        </div>
        <div class="add-category-price ">
            <div class="add-category flex-col ">
                <p>Product category</p>
                <select onChange={onChangeHandler} name="category" >
                    <option value="Salad">Salad</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Hamburgers">Hamburgers</option>
                    <option value="Sandwiches">Sandwiches</option>
                    <option value="Tacos">Tacos</option>
                    <option value="Gratin">Gratin</option>
                    
                </select>
            </div>
            <div class="add-price flex-col">
                <p>Product price</p>
                <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder='450 DZD' />
            </div>
        </div>
        <button type="submit" className='add-btn ' >ADD</button>
        </form>
      
    </div>
  )
}

export default Add
