  import React from 'react'
  import './Header.css';
import { Link } from 'react-router-dom';
  function Header() {
    return (
      <div className="header" >
        <div class="header-contents">
            <h2>Order your favourite food here</h2>
            <p>Enjoy delicious meals from the comfort of your home! Choose from a variety of dishes, and get your favorites delivered fast and fresh.</p>
           <a href="/#explore-menu" class="button">View Menu</a>

        </div>
      </div>
    )
  }
  
  export default Header
  