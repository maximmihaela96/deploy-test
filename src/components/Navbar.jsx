import { Link, useNavigate  } from 'react-router-dom';
import React from "react";
import '../services/Navbar.css';
import logo from '../images/logo_black.png';

function Navbar()  {
  const navigate = useNavigate();

  function redirectToShoppingCart() {
    const selectedBurger = JSON.parse(localStorage.getItem('selectedBurger'));
    const selectedDrinks = JSON.parse(localStorage.getItem('selectedDrinks'));
    const selectedFries = JSON.parse(localStorage.getItem('selectedFries'));

    if ((Array.isArray(selectedFries) && selectedFries.length > 0)
      || (Array.isArray(selectedBurger) && selectedBurger.length > 0)
      || (Array.isArray(selectedDrinks) && selectedDrinks.length > 0)) {
      navigate('/shopping-cart'); // Redirect to the shopping cart
    } else {
      window.alert('You have not selected anything yet! ');
    }
  }

  return (

    // Logo
    <header className="navbar">
      <div className="logo">
        <a href="./"><img src={logo} alt="bun_drop" /></a>
        <div className="logo-title">
          <p className="logo-name">Bun Drop Hamburgers</p>
          <span className="logo-slogan" >Drop it like it's hot! </span>
        </div>
      </div>
      {/* Navbar Items */}
      <div className="navbar-container">
          <div className="navbar-items">
              <ul>
              <Link className="navbar-link" to="/">Home</Link>
              <Link className="navbar-link" to="/meny">Meny</Link>
              </ul>
          </div>
      {/* Icon Item */}
            <div className="icon-container">
            
              <button onClick={redirectToShoppingCart} className="fas fa-shopping-cart"></button>
           
            </div>
      </div>
    </header>
  );
};

export default Navbar;