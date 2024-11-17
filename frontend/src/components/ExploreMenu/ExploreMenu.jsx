import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'
function ExploreMenu( {category,setCategory}) {
  return (
    <div className="explore-menu"  id="explore-menu">
       <h1>Explore our menu</h1>
       <p className='explore-menu-text' >Discover a wide selection of delicious meals crafted to satisfy every craving. From savory classics to unique dishes, our menu has something for everyone. Dive in and find your next favorite meal!</p>
       <div class="explore-menu-list">
        {menu_list.map((item,index)=>{
            return(
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} class="explore-menu-list-item">
                <img className={category===item.menu_name?"active":""} src={item.menu_image}/>
                <p>{item.menu_name}</p>
                </div>
            )
        })}
       </div>
       <hr/>
    </div>
  )
}

export default ExploreMenu
