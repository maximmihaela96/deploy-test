import './App.css';

import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './routes/Home';
import Footer from './components/Footer';

import Meny from './routes/Meny';
import BurgerItem from './routes/BurgerItem';
import ShoppingCart from './routes/ShoppingCart';
import Payment from './routes/Payment';

function App() {
  return (
    <div>

      <div> <Navbar></Navbar> </div>

      <Routes>

        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/meny" element={<Meny />}></Route>
        <Route exact path="/shopping-cart" element={<ShoppingCart />}></Route>
        <Route path="/burgers/:productId" element={<BurgerItem />}></Route>
        <Route exact path="/payment" element={<Payment />}></Route>

      </Routes>

      <div> <Footer></Footer> </div>
    </div>
  );
}

export default App;