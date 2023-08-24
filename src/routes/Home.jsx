import React  from "react";
import Header from '../components/Header';
import '../services/Home.css';
import { Link } from 'react-router-dom';

function Home() {

  return (
    <div>
        <Header></Header>
        <div className="home-page-title">
          <h1>What do you want to buy?</h1>
        </div>
        <div className="product-container">

        <Link to="/meny#burgers">
          <div className="products-card">
            <h2>Burger</h2>
          <img src={process.env.PUBLIC_URL + "/images/burgers/burger-4.png"} alt="" />
          </div>
        </Link>

          <Link to="/meny#fries">
            <div className="products-card">
              <h2>Fries</h2>
            <img src={process.env.PUBLIC_URL + "/images/fries/fries-3.jpg"} alt="" />
            </div>
          </Link>

          <Link to="/meny#drinks">
          <div className="products-card">
            <h2>Drinks</h2>
          <img src={process.env.PUBLIC_URL + "/images/drinks/cola.jpg"} alt="" />
          </div>
          </Link>

        </div>
    </div>
  )
}

export default Home
