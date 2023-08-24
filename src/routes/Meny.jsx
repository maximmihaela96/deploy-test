import React, { useEffect, useState } from "react";
import "../services/Meny.css";
import BurgerCards from "../components/BurgerCards";
import DrinksCard from "../components/DrinksCards";
import FriesCards from "../components/FriesCards";

function Burgers() {
  const [allBurgers, setAllBurgers] = useState([]);
  const [allAdditions, setAddition] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/burgers")
      .then((res) => res.json())
      .then((data) => {
        setAllBurgers(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:7000/addition")
      .then((res) => res.json())
      .then((data) => setAddition(data));
  }, []);

  return (
    
    <div className="meny-container">
      <h1 className="burger-page-title">Burgers Meny</h1>
      <div className="cards-container">
        {allBurgers.map((burger) => (
          <BurgerCards
            key={burger.id}
            id={burger.id}
            name={burger.name}
            price={burger.price}
            image={burger.image}
          />
        ))}
      </div>

      <div id="drinks"  >
        <h1 className="page-title">Drinks</h1>
        {allAdditions.map((drinks) => (
          <DrinksCard key={drinks.id} drinks={drinks.drinks} />
        ))}
      </div>

      <div id="fries">
        <h1 className="page-title">Fries</h1>
        {allAdditions.map((fries) => (
          <FriesCards key={fries.id} fries={fries.fries} />
          ))}
      </div>
</div>
  )
        }

export default Burgers;
