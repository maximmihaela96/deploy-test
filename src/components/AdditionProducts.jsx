import React from "react";
import '../services/ProductDetailsPage.css';

function AdditionProducts({ fries, drinks }) {

  function updateFriesSelection(selectedFries, quantityChange) {
    const existingItems = JSON.parse(localStorage.getItem('selectedFries')) || [];
    const existingFries = existingItems.find((item) => item.id === selectedFries.id);
  
    if (existingFries) {
      if (quantityChange === 1) {
        const confirmAdd = window.confirm('This fries is already in your cart. Do you still want to add it?');
        if (!confirmAdd) {
          return;
        }
        existingFries.quantity += 1;
      } else if (quantityChange === -1) {
        const confirmRemove = window.confirm('Are you sure you want to remove this item?');
        if (!confirmRemove) {
          return;
        }
        if (existingFries.quantity > 1) {
          existingFries.quantity -= 1;
        } else {
          const index = existingItems.findIndex((item) => item.id === existingFries.id);
          existingItems.splice(index, 1);
        }
      }
    } else if (quantityChange === 1) {
      selectedFries.quantity = 1;
      existingItems.push(selectedFries);
    }
  
    localStorage.setItem('selectedFries', JSON.stringify(existingItems));
  }

  function updateDrinksSelection(selectedDrinks, quantityChange) {
    const existingItems = JSON.parse(localStorage.getItem('selectedDrinks')) || [];
  
    const existingDrinks = existingItems.find((item) => item.id === selectedDrinks.id);
  
    if (existingDrinks) {
      if (quantityChange === 1) {
        const confirmAdd = window.confirm('This drink is already in your cart. Do you still want to add it?');
        if (!confirmAdd) {
          return;
        }
        existingDrinks.quantity += 1;
      } else if (quantityChange === -1) {
        const confirmRemove = window.confirm('Are you sure you want to remove this item?');
        if (!confirmRemove) {
          return;
        }
        if (existingDrinks.quantity > 1) {
          existingDrinks.quantity -= 1;
        } else {
          const index = existingItems.findIndex((item) => item.id === existingDrinks.id);
          existingItems.splice(index, 1);
        }
      }
    } else if (quantityChange === 1) {
      selectedDrinks.quantity = 1;
      existingItems.push(selectedDrinks);
    }
  
    localStorage.setItem('selectedDrinks', JSON.stringify(existingItems));
  }
  

return (
  <div>
    <div className="addition-container">
          <ul>
          <h2> Choose your fries:</h2>
            {fries?.map((fries) => (
              <div key={fries.id} className="fries-details">
                <img src={process.env.PUBLIC_URL + fries.image} alt="" style={{ width: '50px', height: '50px' }} />
                <p>{fries.name}</p>
                <p>{fries.price} kr</p>
                  <div className="fries-button">
                  <button onClick={() => updateFriesSelection(fries, 1)}>+</button>
                  <button onClick={() => updateFriesSelection(fries, -1)}>-</button>
                  </div>
               </div>
             ))}
           </ul>

          <ul>
          <h2>Choose your Drink:</h2>
            {drinks?.map((drink) => (
              <div key={drink.id} className="drinks-details">
              
              <img src={process.env.PUBLIC_URL + drink.image} alt="" style={{ width: '50px', height: '50px'}} />
              <p>{drink.name}</p>
              <p>{drink.price} kr</p>
                <div className="drinks-button">
                  <button onClick={() => updateDrinksSelection(drink, 1)}>+</button>
                  <button onClick={() => updateDrinksSelection(drink, -1)}>-</button> 
                </div>
              </div>
               ))}
            </ul>
      </div>
  </div>
)};
export default AdditionProducts
