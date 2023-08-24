import React, { useEffect, useState } from 'react';
import '../services/PaymentDetails.css';

function CardDetails({
  cardNumber,
  setCardNumber,
  cardName,
  setCardName,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
  setCardDetailsValid,
  setPaymentMethod,
}) {
  const [isCardNumberValid, setCardNumberValid] = useState(true);
  const [isCardNameValid, setCardNameValid] = useState(true);
  const [isExpiryDateValid, setExpiryDateValid] = useState(true);
  const [isCvvValid, setCvvValid] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  useEffect(() => {
    validateCardDetails();
  }, [cardNumber, cardName, expiryDate, cvv]);

  function validateCardDetails() {

    const cardNumberValid = selectedPaymentMethod === 'swish' || cardNumber.trim() !== '';
    const cardNameValid = selectedPaymentMethod === 'swish' || cardName.trim() !== '';
    const expiryDateValid = selectedPaymentMethod === 'swish' || expiryDate.trim() !== '';
    const cvvValid = selectedPaymentMethod === 'swish' || cvv.trim() !== '';
    
    setCardNumberValid(cardNumberValid);
    setCardNameValid(cardNameValid);
    setExpiryDateValid(expiryDateValid);
    setCvvValid(cvvValid);

    const isFormValid = cardNumberValid && cardNameValid && expiryDateValid && cvvValid;
    setCardDetailsValid(isFormValid);
  }

  function handlePaymentMethodChange(e) {
    setSelectedPaymentMethod(e.target.value);
    setPaymentMethod(e.target.value); // Send the selected payment method to the payment component
  }

  return (
    <div className="card-details-container">
      <h2>Card Payment Details</h2>
      <div>
        <label>Payment Method:</label>
        <div>
        <label>Card</label>
          <input
            type="radio"
            id="paymentMethodCard"
            name="paymentMethod"
            value="card"
            checked={selectedPaymentMethod === 'card'}
            onChange={handlePaymentMethodChange}
          />
        </div>
        <div>
        <label>Swish</label>
          <input
            type="radio"
            id="paymentMethodSwish"
            name="paymentMethod"
            value="swish"
            checked={selectedPaymentMethod === 'swish'}
            onChange={handlePaymentMethodChange}
          />
        </div>
      </div>

      {selectedPaymentMethod === 'card' && (
        <>
          <div>
            <label>Card Number:</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className={isCardNumberValid ? '' : 'invalid'}
            />
          </div>

          <div>
            <label>Your Name:</label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className={isCardNameValid ? '' : 'invalid'}
            />
          </div>

          <div>
            <label>Expiry Date:</label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className={isExpiryDateValid ? '' : 'invalid'}
            />
          </div>

          <div>
            <label>Your CVV:</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className={isCvvValid ? '' : 'invalid'}
            />
          </div>
        </>
      )}

      {selectedPaymentMethod === 'swish' && (
        <div>
          <label>Swish Phone Number:</label>
          <input
            type="text"
            value={cardNumber} 
            onChange={(e) => setCardNumber(e.target.value)}
            className={isCardNumberValid ? '' : 'invalid'}
          />
        </div>
      )}
    </div>
  );
}

export default CardDetails;
