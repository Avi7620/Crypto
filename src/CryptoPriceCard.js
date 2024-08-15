import React, { useState, useEffect } from 'react';
import './CryptoPriceCard.css'; // Ensure you have appropriate styles

const API_URL = 'https://api.coingecko.com/api/v3/simple/price';

function CryptoPriceCard() {
  const [crypto, setCrypto] = useState('bitcoin'); // Default cryptocurrency
  const [amount, setAmount] = useState(1); // Default amount
  const [prices, setPrices] = useState({});
  const [error, setError] = useState(null);

  const handleCryptoChange = (event) => {
    setCrypto(event.target.value.toLowerCase());
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  useEffect(() => {
    fetch(`${API_URL}?ids=${crypto}&vs_currencies=usd,eur,inr`)
      .then(response => response.json())
      .then(data => setPrices(data[crypto]))
      .catch(error => setError('Error fetching data'));
  }, [crypto]);

  const calculatedPrices = {
    usd: (prices?.usd * amount).toFixed(2),
    eur: (prices?.eur * amount).toFixed(2),
    inr: (prices?.inr * amount).toFixed(2),
  };

  return (
    <div>
      <div className="form-container">
        
        <input
          id="crypto"
         
          value={crypto}
          onChange={handleCryptoChange}
          placeholder="e.g., bitcoin"
        />
      </div>
      <div className="form-container">
        <label htmlFor="amount">Amount: </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          min="0"
          step="any"
        />
      </div>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="price-container">
          {prices ? (
            <div className="price-card">
              <h3>{crypto.charAt(0).toUpperCase() + crypto.slice(1)}</h3>
              <p>USD: ${calculatedPrices.usd}</p>
              <p>EUR: €{calculatedPrices.eur}</p>
              <p>INR: ₹{calculatedPrices.inr}</p>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      )}
    </div>
  );
}

export default CryptoPriceCard;
