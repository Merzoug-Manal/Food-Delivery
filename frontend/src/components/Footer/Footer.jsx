import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";
function Footer() {
  return (
    <div className="footer" id="footer">
      <div class="footer-content">
        <div class="footer-content-left">
        <img src={assets.logo} className="footer-logo" />
        <p>
          Delicious meals delivered right to your door! At KingFood, we’re
          committed to bringing you fresh, quality food from your favorite local
          restaurants. Whether it’s lunch, dinner, or a late-night craving,
          we’re here to make ordering fast, easy, and reliable. Bon appétit!
        </p>
       
        <div class="footer-social-icons">
          <img  className="icon" src={assets.facebook_icon} alt="" />
          <img className="icon" src={assets.twitter_icon} alt="" />
          <img className="icon" src={assets.linkedin_icon} alt="" />
        </div>
        </div>
        <div class="footer-content-center">
        <h2>COMPANY</h2>
        <ul>
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </ul>
        </div>
        <div class="footer-content-right">
        <h2>GET IN TOUCH</h2>
        <ul>
          <li>0589001200</li>
          <li>contact@kingfood.com</li>
        </ul>
      </div>
      </div>
      <hr/>
      <p className="footer-copyrigth" >Copyright 2024 © Kingfood.com -All Right Reserved. </p>
    </div>
  );
}

export default Footer;
