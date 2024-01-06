import { click } from '@testing-library/user-event/dist/click';
import React, { useState } from 'react';

function App() {
  const [strawsProduced, setStrawsProduced] = useState(0);
  const [strawsInInventory, setStrawsInInventory] = useState(0);
  const [money, setMoney] = useState(0);
  const [strawPrice, setStrawPrice] = useState(0.10); // Starting price of one straw
  const [sellIntervalId, setSellIntervalId] = useState(null);

  const produceStraw = () => {
    setStrawsProduced(prev => prev + 1);
    setStrawsInInventory(prev => prev + 1);
  };


  const updateStrawPrice = (newPrice) => {
    setStrawPrice(newPrice);
  };

  const calculateDemand = (price) => {
    const maxDemand = 100; // Maximum demand at the lowest price
    const demand = maxDemand / price; // Simple inverse relationship
    return Math.max(0, demand); // Ensure demand is not negative
  };

  const startSelling = () => {
    if (sellIntervalId) return; // Avoid multiple intervals
  
    const id = setInterval(() => {
      setStrawsInInventory(prevInventory => {
        if (prevInventory > 0) {
          // If there are straws in inventory, sell one
          setMoney(prevMoney => prevMoney + strawPrice);
          return prevInventory - 1; // Reduce inventory by one
        } else {
          // If no straws left, stop the selling process
          clearInterval(id);
          setSellIntervalId(null);
          return prevInventory; // Return the current inventory (which is 0)
        }
      });
    }, calculateInterval());
  
    setSellIntervalId(id);
  };
  
  
  
  const calculateInterval = () => {
    const maxInterval = 100000; // Interval in milliseconds at lowest demand
    const demand = calculateDemand(strawPrice);
    return Math.max(1000, maxInterval / demand); // Adjust this formula as needed
  };
  

  const stopSelling = () => {
    clearInterval(sellIntervalId);
    setSellIntervalId(null);
  };
  
  

  return (
    <div className="App">
      <h1>Strawtopia: The Rise of Paper Power</h1>
      <p>Straws Produced: {strawsProduced}</p>
      <p>Straws in Inventory: {strawsInInventory}</p>
      <p>Money: ${money.toFixed(2)}</p>
      <p>Current Straw Price: ${strawPrice.toFixed(2)}</p>
      <input
        type="number"
        value={strawPrice}
        onChange={(e) => updateStrawPrice(parseFloat(e.target.value))}
        min="0.01"
        step="0.01"
      />
      <button onClick={produceStraw}>Produce Straw</button>
      <button onClick={startSelling}>Start Selling</button>
      <button onClick={stopSelling}>Stop Selling</button>
    </div>
  );  
}

export default App;
