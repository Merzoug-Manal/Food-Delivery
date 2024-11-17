import React, { useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react';
function List({url}) {
 
  
 const [list,setList] = useState([]);

 const fetchList = async () => {
   const response = await axios.get(`${url}/api/food/list`);
   if (response.data.success) {
    setList(response.data.data)
   }
   else{
    toast.error("Error")
   }
 }
  const removeFood= async(foodId)=>{
   const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
   await fetchList();
   if (response.data.success) {
    toast.success(response.data.message)
   }
   
  }

 useEffect(() =>{
  fetchList();
 },[])

  return (
    <div className='list add flex-col' >
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title ">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format' >
              <img src={`${url}/images/`+item.image} alt=""/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='delete-btn' ><svg viewBox="0 0 15 17.5"  xmlns="http://www.w3.org/2000/svg" class="icon">
  <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
</svg></p>
            </div>
          )
        })}
      </div>
     
    </div>
  )
}

export default List
