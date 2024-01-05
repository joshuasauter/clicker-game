import { click } from '@testing-library/user-event/dist/click';
import React, { useState } from 'react';

function App() {
  const [strawsProduced, setStrawsProduced] = useState(0);
  const [strawsInInventory, setStrawsInInventory] = useState(0);
  const [money, setMoney] = useState(0);
  const [strawPrice, setStrawPrice] = useState(0.10); // Starting price of one straw


  const produceStraw = () => {
    setStrawsProduced(prev => prev + 1);
    setStrawsInInventory(prev => prev + 1);
  };

  const sellStraws = () => {
    const sellPrice = 0.10; // The price of one straw, for example
    setMoney(prevMoney => prevMoney + sellPrice * strawsInInventory);
    setStrawsInInventory(0); // All straws in inventory are sold
  };

  const updateStrawPrice = (newPrice) => {
    setStrawPrice(newPrice);
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
      <button onClick={sellStraws}>Sell All Straws</button>
    </div>
  );  
}

export default App;
