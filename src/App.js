import React, { useState, useEffect } from 'react';

function App() {
  const [strawsProduced, setStrawsProduced] = useState(0);
  const [strawsInInventory, setStrawsInInventory] = useState(0);
  const [money, setMoney] = useState(0);
  const [strawPrice, setStrawPrice] = useState(0.10);
  const [isSelling, setIsSelling] = useState(false);
  const [demand, setDemand] = useState(1.0); // Initial demand
  const [maxDemand, setMaxDemand] = useState(2000); // Maximum demand at price 0
  const [priceCoefficient, setPriceCoefficient] = useState(10000.0); // Coefficient affecting demand based on price
  const [timeCoefficient, setTimeCoefficient] = useState(1000000); // Coefficient for calculating selling interval
  const [sellingInterval, setSellingInterval] = useState(1000); // Time between sales

  const produceStraw = () => {
    setStrawsProduced(prev => prev + 1);
    setStrawsInInventory(prev => prev + 1);
    setIsSelling(true);
  };

  const sellStraw = () => {
    setStrawsInInventory(prevStraws => {
      if (prevStraws > 0) {
        setMoney(prevMoney => prevMoney + strawPrice);
        return prevStraws - 1;
      } else {
        setIsSelling(false);
        return prevStraws;
      }
    });
  };

  const increasePrice = () => {
    setStrawPrice(prevPrice => {
      const newPrice = prevPrice + 0.01;
      updateDemand(newPrice); // Update demand with new price
      return newPrice;
    });
  };
  
  const decreasePrice = () => {
    setStrawPrice(prevPrice => {
      const newPrice = Math.max(0.01, prevPrice - 0.01); // Ensure price doesn't go below $0.01
      updateDemand(newPrice); // Update demand with new price
      return newPrice;
    });
  };
  

  const updateDemand = (currentPrice = strawPrice) => {
    const newDemand = maxDemand - priceCoefficient * currentPrice;
    setDemand(newDemand > 0 ? newDemand : 0);
  };
  

  const updateSellingInterval = () => {
    if (demand === 0) {
      setIsSelling(false);
      setSellingInterval(null);
    } else {
      const newInterval = timeCoefficient / demand;
      setSellingInterval(newInterval);
    }
  };

  // Update demand whenever maxDemand, priceCoefficient, or strawPrice changes
  useEffect(() => {
    updateDemand();
  }, [maxDemand, priceCoefficient, strawPrice]);

  // Update sellingInterval whenever demand changes
  useEffect(() => {
    updateSellingInterval();
  }, [demand]);

  useEffect(() => {
    let intervalId;
  
    if (isSelling) {
      intervalId = setInterval(() => {
        sellStraw();
      }, sellingInterval);
    }
  
    return () => clearInterval(intervalId);
  }, [isSelling, sellingInterval]);
  

  return (
    <div className="App">
      <h1>Strawtopia: The Rise of Paper Power</h1>
      <p>Straws Produced: {strawsProduced}</p>
      <p>Straws in Inventory: {strawsInInventory}</p>
      <p>Money: ${money.toFixed(2)}</p>
      <p>Straw Price: ${strawPrice.toFixed(2)}</p>
      <button onClick={produceStraw}>Produce Straw</button>
      <button onClick={increasePrice}>Increase Price</button>
      <button onClick={decreasePrice}>Decrease Price</button>

      <div className="game-variables">
        <h2>Game Variables</h2>
        <p>Demand: {demand.toFixed(2)}</p>
        <p>Max Demand: {maxDemand}</p>
        <p>Time Coefficient: {timeCoefficient}</p>
        <p>Price Coefficient: {priceCoefficient.toFixed(2)}</p>
        <p>Selling Interval: {sellingInterval ? sellingInterval.toFixed(2) + ' ms' : 'Not Selling'}</p>
      </div>
    </div>
  );    
}

export default App;

