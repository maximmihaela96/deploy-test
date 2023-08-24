import { Link } from "react-router-dom";
import React from "react";
import '../services/ProductCards.css';


function BurgerCards({ name, price, image, id }) {

  function addToCart() {
    const existingItems = JSON.parse(localStorage.getItem('selectedBurger')) || [];
    let existingBurger = existingItems.find((item) => item.burger.id === id);
  
    if (existingBurger) {
      const confirmAdd = window.confirm('This burger is already in your cart. Do you still want to add it?');
      if (!confirmAdd) {
        return; 
      }
      existingBurger.burger.quantity += 1;
    } else {
      window.confirm('This burger was added in the cart!');
      existingBurger = { burger: { id, name, price, image, quantity: 1  }};
      existingItems.push(existingBurger);
    }
  
    localStorage.setItem('selectedBurger', JSON.stringify(existingItems));
  }
  
  return (
    <div className="card">
      <Link to={`/burgers/${id}`}>   
        <div>
              <img src={image} alt="" />
              <h1>{name}</h1>
              <p>{price} <span>kr</span></p> 
        </div>
      </Link>
        <button onClick={addToCart}>Add to Cart</button>
        </div>
  );
}
export default BurgerCards;