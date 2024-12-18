import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import ResetPassword from './components/Login/ResetPassword'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyOrders from './pages/MyOrders/MyOrders'

function App() {

const [showLogin,setShowLogin] = useState(false);
  return (
    <>
    <ToastContainer/>
    {showLogin?<Login setShowLogin={setShowLogin} />:<></>}
    <div className='app' >
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/order" element={<PlaceOrder/>}/>
        <Route path="/myorders" element={<MyOrders/>}/>
      </Routes>
    </div>
    <Footer/>
    </>  
  )
}

export default App
