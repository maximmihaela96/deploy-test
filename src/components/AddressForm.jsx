import React, { useEffect, useState } from 'react';
import '../services/PaymentDetails.css';

function AddressForm({
    firstName, setFirstName,
    lastName, setLastName,
    streetAddress, setStreetAddress,
    city, setCity,
    houseNumber, setHouseNumber,
    setDeliveryDetailsValid,
  }){

    const [isFirstNameValid, setFirstNameValid] = useState(true);
    const [isLastNameValid, setLastNameValid] = useState(true);
    const [isStreetAddressValid, setStreetAddressValid] = useState(true);
    const [isCityValid, setCityValid] = useState(true);
    const [isHouseNumberValid, setHouseNumberValid] = useState(true);

    useEffect(() => {
      validateDeliveryDetails();
    }, [firstName, lastName, streetAddress, city, houseNumber ]);

    function validateDeliveryDetails() {

      const firstNameValid = firstName.trim() !== "";
      const lastNameValid = lastName.trim() !== "";
      const streetAddressValid = streetAddress.trim() !== "";
      const cityValid = city.trim() !== "";
      const isHouseNumberValid = houseNumber.trim() !== "";
  
      setFirstNameValid(firstNameValid);
      setLastNameValid(lastNameValid);
      setStreetAddressValid(streetAddressValid);
      setCityValid(cityValid);
      setHouseNumberValid(isHouseNumberValid);
  
      const isFormValid = firstNameValid && lastNameValid && streetAddressValid && cityValid && isHouseNumberValid;
      setDeliveryDetailsValid(isFormValid);
    }

  return (
    <div className="delivery-details-container">
      <h2>Delivery Details</h2>
      <div>

        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={isFirstNameValid ? '' : 'invalid'}
        />
      </div>

      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={isLastNameValid ? '' : 'invalid'}
        />
      </div>

      <div>
        <label>Street:</label>
        <input
          type="text"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
          className={isStreetAddressValid ? '' : 'invalid'}
        />
      </div>

      <div>
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={isCityValid ? '' : 'invalid'}
        />
      </div>

      <div>
        <label>House/Apartment Number:</label>
        <input
          type="text"
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
          className={isHouseNumberValid ? '' : 'invalid'}
        />
      </div>
    </div>
  );
}

export default AddressForm;