import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardDetails from '../components/CardDetails';
import AddressForm from '../components/AddressForm';

function Payment() {

  const [selectedBurger, setSelectedBurger ] = useState( JSON.parse(localStorage.getItem("selectedBurger")) || []);
  const [selectedFries, setSelectedFries ] = useState(JSON.parse(localStorage.getItem("selectedFries")) || []);
  const [selectedDrinks, setSelectedDrinks] = useState( JSON.parse(localStorage.getItem("selectedDrinks")) || [] );

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  
  const [cvv, setCvv] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

  const [cardDetailsValid, setCardDetailsValid] = useState(false);
  const [deliveryDetailsValid, setDeliveryDetailsValid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();
  

  function calculateBurgersPrice(burgers) {
    const burgerPrice = burgers.burger.price;
    const quantity = burgers.burger.quantity;
    const burgersPrice = burgerPrice * quantity;
    return burgersPrice;
  }

  function calculateFriesPrice(fries) {
    const friesPrice = fries.price;
    const quantity = fries.quantity;
    const friessPrice = friesPrice * quantity;
    return friessPrice;
  }

  function calculateDrinksPrice(drinks) {
    const drinkPrice = drinks.price;
    const quantity = drinks.quantity;
    const drinksPrice = drinkPrice * quantity;
    return drinksPrice;
  }
  
  // Calculate the total payment price
const totalBurgerPrice = selectedBurger.reduce((total, burger) => {
  const burgerPrice = calculateBurgersPrice(burger);
  return total + burgerPrice;
}, 0);

const totalFriesPrice = selectedFries.reduce((total, fries) => {
  const friesPrice = calculateFriesPrice(fries);
  return total + friesPrice;
}, 0);

const totalDrinksPrice = selectedDrinks.reduce((total, drink) => {
  const drinksPrice = calculateDrinksPrice(drink);
  return total + drinksPrice;
}, 0);

const totalPrice = (totalBurgerPrice + totalFriesPrice + totalDrinksPrice).toFixed(2);

  function getRandomDeliveryTime() {
    const deliveryTimes = ['15 minutes', '30 minutes', '1 hour'];
    const randomIndex = Math.floor(Math.random() * deliveryTimes.length);
    return deliveryTimes[randomIndex];
  }

  function handlePlaceOrder() {
    if (cardDetailsValid && deliveryDetailsValid) {

    const order = [...selectedBurger, ...selectedFries, ...selectedDrinks];

    let orderData = {
      totalPrice: totalPrice,
      paymentMethod: paymentMethod, 
      order: order,
      adressDetails: {
        firstName: firstName,
        lastName: lastName,
        streetAddress: streetAddress,
        city: city,
        houseNumber: houseNumber,
      },
    };
    if (paymentMethod === 'card') {
      // If payment method is card, insert card details
      orderData = {
        ...orderData,
        cardDetails: {
          cardNumber: cardNumber,
          cardName: cardName,
          expiryDate: expiryDate,
          cvv: cvv,
        },
      };
    } else if (paymentMethod === 'swish') {
      // If payment method is Swish, insert Swish number
      orderData = {
        ...orderData,
        swishNumber: cardNumber,
      };
    }

    fetch("http://localhost:7000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order placed successfully:", data);
        // Clear the local storage and reset selected items
        localStorage.clear();
        setSelectedBurger([]);
        setSelectedFries([]);
        setSelectedDrinks([]);

      // Reset the card details inputs
        setCardNumber("");
        setCardName("");
        setExpiryDate("");
        setCvv("");

      // Reset the address details inputs
        setFirstName("");
        setLastName("");
        setStreetAddress("");
        setCity("");
        setHouseNumber("");
        window.alert(`Order placed successfully!Delivery time is: ${getRandomDeliveryTime()}`);
        navigate('/'); // Go to the main page
        
     })
     .catch((error) => {
       console.error("Error placing order:", error);
     });
 } else {
   window.alert('Please complete all the inputs. We need all the payment and delivery details before the order can be placed!');
 }
}
  function cancelOrder() {

    localStorage.clear();
    window.alert('The order was cancelled.');
    navigate('/');
  }
  
return (
  
<div>
  <div className='order-confirmation'>
    <div className="order-title">
      <h2>Order Confirmation</h2>
    </div>
    <div className='order-container'>
          {selectedBurger.map((item) => {
          const burger = item.burger;
          return (
            <div key={burger.id} className="burger-card">
              <h5 style={{marginRight:'5px', fontSize:'15px'}}>Burger Type: {burger.name}</h5>
              <p style={{marginRight:'5px'}} > X {burger.quantity} - </p>
              <p style={{ fontWeight: 'bold'}}> Price:<span> {calculateBurgersPrice(item).toFixed(2)}kr </span></p>
            </div>
          );
        })}

{selectedFries.length > 0 && (
  <div>
    {selectedFries.map((fries) => (
      <div key={fries.id} className="fries-card">
        <h5 style={{marginRight:'5px', fontSize:'15px'}}>{fries.name} </h5>
        <p style={{marginRight:'5px'}} > X {fries.quantity} - </p>
        <p style={{ fontWeight: 'bold'}}> Price: {calculateFriesPrice(fries).toFixed(2)} kr</p>
      </div>
    ))}
  </div>
)}
{selectedFries.length > 0 && (
    <div>
          {selectedDrinks.map((drink) => (
          <div key={drink.id}  className="drinks-card">
            <h5 style={{marginRight:'5px', fontSize:'15px'}}>Name: {drink.name}</h5>
            <p style={{marginRight:'5px'}} > X {drink.quantity} - </p>
            <p style={{ fontWeight: 'bold'}}> Price:{calculateDrinksPrice(drink).toFixed(2)}kr</p>
          </div>
        ))}
  </div>
)}
    <div>
      <h4 style={{  display: 'flex',backgroundColor:'#b6da03' ,justifyContent:'center', width:'30%', margin:'0 auto'}}>Total Price: {totalPrice}</h4>
    </div>

      </div>
      <div className='card-container'>
                    
        <CardDetails
            cardNumber={cardNumber} setCardNumber={setCardNumber}
            cardName={cardName} setCardName={setCardName}
            expiryDate={expiryDate} setExpiryDate={setExpiryDate}
            cvv={cvv} setCvv={setCvv}
            setPaymentMethod={setPaymentMethod}
            setCardDetailsValid={setCardDetailsValid}
          />
      </div>

      <div className='address-container'>
        <AddressForm
            firstName={firstName} setFirstName={setFirstName}
            lastName={lastName} setLastName={setLastName}
            streetAddress={streetAddress} setStreetAddress={setStreetAddress}
            city={city} setCity={setCity}
            houseNumber={houseNumber} setHouseNumber={setHouseNumber}
            setDeliveryDetailsValid={setDeliveryDetailsValid}
          />
      </div>

      <div className='payment-buttons'>
            <button type="button" onClick={handlePlaceOrder}>Place Order</button>
            <button type="button" onClick={cancelOrder}>Cancel Order</button>
      </div>
    </div>
  </div>

 );   
}
export default Payment
