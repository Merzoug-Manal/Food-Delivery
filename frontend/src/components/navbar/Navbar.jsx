import React, { useContext, useState } from 'react'
import './Navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import {assets} from '../../assets/frontend_assets/assets'
import { StoreContext } from '../Context/StoreContext';
function Navbar({setShowLogin}) {

  const [menu,setMenu]=useState("home");   
  const {getTotalCartAmount,token,setToken}=useContext(StoreContext)                
  const navigate = useNavigate();
  const logout=()=>{
   localStorage.removeItem('token');
   setToken("");
   navigate("/");

  }
  return (
    <div className='navbar'>
     <Link to='/' ><img src={assets.logo} alt="" class="logo"/></Link>
     <ul class="navbar-menu">
      <Link to='/' onClick={() =>setMenu("home")} className={menu==="home"?"active":""} >home</Link>
      <a href='#explore-menu' onClick={() =>setMenu("menu")} className={menu==="menu"?"active":""} >menu</a>
      <a href="#app-download" onClick={() =>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""} >mobile-app</a>
      <a href="#footer" onClick={() =>setMenu("contact-us")} className={menu==="contact-us "?"active":""} >contact-us</a>
     </ul>
     <div class="navbar-right">
      <img src={assets.search_icon} alt="" />
      <div class="navbar-search-icon">
      <Link to='/cart'> <img src={assets.basket_icon} /></Link>
        <div class={getTotalCartAmount()===0?"":"dot"}></div>
      </div>

      {!token ?
      <button onClick={()=>setShowLogin(true)} >Sign in</button>
    :<div className='navbar-profile' >
      <img src={assets.profile_icon} alt=""/>
      <ul class="nav-profile-dropdown">
      <Link to='/myorders' > <li><img src={assets.bag_icon} alt=""/><p>Orders</p></li></Link> 
        <hr/>
        <li onClick={logout} ><img src={assets.logout_icon} alt=""/><p>Logout</p></li>
      </ul>
      </div>}
     </div>
    </div>
  )
}

export default Navbar
