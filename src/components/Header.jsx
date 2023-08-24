import React from 'react'
import '../services/Header.css';
import burgerImage from '../images/burger.png'; 
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
        <div className="header-text">
          <h1>
            Order your best food anytime by BunDrop!
          </h1>

          <p>
          At Bun Drop Burgers, we believe that a burger should be more than just a meal it should be an experience.
          <br/>So join us today and let us treat you to the tastiest burgers!
          Bring your friends and you won't regret it!
          </p>

          <div className='order-btn'>
            <Link to="/meny" className='orderBtn'>Order Now</Link>
          </div>
        </div>

          <div className="header-img">
            <img src={burgerImage} alt="" />
          </div>
      </div>
  )
}

export default Header
