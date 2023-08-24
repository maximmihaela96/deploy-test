import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import '../services/ProductDetailsPage.css';
import AdditionProducts from "../components/AdditionProducts";

function BurgerItem() {
  const { productId } = useParams();
  const [burger, setBurger] = useState({});
  const [addition, setAddition] = useState();
  const [quantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:7000/burgers/${productId}`)
      .then((res) => res.json())
      .then((data) => setBurger(data));
  }, [productId]);

  useEffect(() => {
    fetch(`http://localhost:7000/addition`)
      .then((res) => res.json())
      .then((data) => setAddition(data));
  }, []);

  function addToCart() {
    const existingItems = JSON.parse(localStorage.getItem('selectedBurger')) || [];
    const existingBurgerIndex = existingItems.findIndex(item => item.burger.id === burger.id);
  
    if (existingBurgerIndex !== -1) {
      const existingBurger = existingItems[existingBurgerIndex];
      const confirmAdd = window.confirm('This burger is already in your cart. Do you still want to add it?');
      if (!confirmAdd) {
        return; 
      }
      existingBurger.burger.quantity += 1;
      existingItems[existingBurgerIndex] = existingBurger;
    } else {
      window.confirm('This burger was added in the cart!');
      const newBurger = { burger: { id: burger.id, name: burger.name, price: burger.price, image: burger.image, quantity: quantity } };
      existingItems.push(newBurger);
    }
  
    localStorage.setItem('selectedBurger', JSON.stringify(existingItems));
  }

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
  <div>
    <div className="details-container">
      <div className="burger-img">
      <img src={process.env.PUBLIC_URL + burger.image} alt="" />
      </div>
   
        <div className="burger-details">
          <h1> {burger.name}</h1>
          <p>Price: {burger.price} kr</p>
          <p>Description: <span> {burger.description}</span></p>
          <div className='order-btn'>
            <button className="orderBtn" onClick={addToCart}>Order</button>
        </div>

        <div>
          {addition?.map((addition) => (
            <AdditionProducts key={addition.id} fries={addition.fries} drinks={addition.drinks} />
          ))}
        </div>

        <Link to={"/burgers"}><button className="backtomenu-btn" >Back to Menu</button></Link>
        <button className='gotocart-btn' onClick={redirectToShoppingCart}>Go to Shopping Cart</button>
      </div>
    </div>
  </div>
  );
}

export default BurgerItem;
