import React, { useState, useEffect, useRef } from 'react';
import Workforce from './components/Workforce';
import './App.css';


function App() {
  const [strawsProduced, setStrawsProduced] = useState(0);
  const [strawsInInventory, setStrawsInInventory] = useState(0);
  const [money, setMoney] = useState(200);
  const [isSelling, setIsSelling] = useState(false);
  const [strawPrice, setStrawPrice] = useState(0.10); // Initial straw price
  const [marketingLevels, setMarketingLevels] = useState(1); // M in the formula
  const [bonuses, setBonuses] = useState(1); // Bonus multiplier
  const [demand, setDemand] = useState(0); // Demand for straws
  const [strawsSoldPerSecond, setStrawsSoldPerSecond] = useState(0); // Straws sold per second
  const [sellingInterval, setSellingInterval] = useState(1000); // Inverse of straws sold per second, in milliseconds
  const [paperSquares, setPaperSquares] = useState(500);
  const [squaresPerPurchase, setSquaresPerPurchase] = useState(500);
  const [costPerSquarePurchase, setCostPerSquarePurchase] = useState(20);
  const [sellIntervalId, setSellIntervalId] = useState(null);
  const [autoStrawsPerSecond, setAutoStrawsPerSecond] = useState(0)

  const inventoryRef = useRef(strawsInInventory);

  useEffect(() => {
    inventoryRef.current = strawsInInventory;
  }, [strawsInInventory]);

  const produceStraw = () => {
    if (paperSquares > 0) {
      setStrawsProduced(prev => prev + 1);
      setStrawsInInventory(prev => prev + 1);
      setPaperSquares(prev => prev - 1);
      setIsSelling(true);
    }
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

  const purchaseSquares = () => {
    if (money >= costPerSquarePurchase) {
      setMoney(prevMoney => prevMoney - costPerSquarePurchase);
      setPaperSquares(prevSquares => prevSquares + squaresPerPurchase);
    } else {
      console.log("not enough money :(")
    }
  };

  const updateDemand = () => {
    const newDemand = Math.pow(1.1, marketingLevels) * bonuses * (0.8 / strawPrice);
    setDemand(newDemand);
    updateStrawsSoldPerSecond(newDemand);
  };
  
  const updateStrawsSoldPerSecond = (currentDemand) => {
    const newStrawsSoldPerSecond = Math.min(1, currentDemand / 100) * 1 * Math.pow(currentDemand, 1.15);
    setStrawsSoldPerSecond(newStrawsSoldPerSecond);
    const newInterval = 1 / newStrawsSoldPerSecond * 1000;
    console.log("New selling interval:", newInterval); // Debugging log
    setSellingInterval(newInterval);
  };
    
  // Update demand whenever maxDemand, priceCoefficient, or strawPrice changes
  useEffect(() => {
    updateDemand();
  }, [strawPrice, marketingLevels, bonuses]);
  
  
  const startSelling = () => {
    if (sellIntervalId) {
      clearInterval(sellIntervalId);
    }
  
    const id = setInterval(() => {
      if (inventoryRef.current > 0) {
        setStrawsInInventory(prev => prev - 1);
        inventoryRef.current -= 1;
        setMoney(prev => prev + strawPrice);
      } else {
        setIsSelling(false);
        clearInterval(id);
      }
    }, sellingInterval);
  
    setSellIntervalId(id);
  };
  
  useEffect(() => {
    if (isSelling) {
      startSelling();
    }
  
    return () => {
      if (sellIntervalId) {
        clearInterval(sellIntervalId);
        setSellIntervalId(null);
      }
    };
  }, [isSelling, sellingInterval]);

  const updateMoney = (newMoneyValue) => {
    setMoney(newMoneyValue);
  };
  
  const updateAutoStrawsPerSecond = (newRate) => {
    setAutoStrawsPerSecond(newRate);
  };
  
  const updateMarketingLevels = (newLevel) => {
    setMarketingLevels(newLevel);
  };  

  useEffect(() => {
    const autoProduceStraws = setInterval(() => {
      if (autoStrawsPerSecond > 0 && paperSquares > 0) {
        produceStraw();
      }
    }, (1000 * (1 / Math.max(1, autoStrawsPerSecond)))); // Every second
  
    return () => clearInterval(autoProduceStraws);
  }, [autoStrawsPerSecond, paperSquares]);
  
  
  return (
    <div className="App">
      <div className="window">
        <div className="window-titlebar">Turtle Saver Inc.</div>
        <p>Straws Produced: {strawsProduced}</p>
      </div>

      <div className="window">
        <div className="window-titlebar">Business</div>
        <p>Straws in Inventory: {strawsInInventory}</p>
        <p>Money: ${money.toFixed(2)}</p>
        <p>Straw Price: ${strawPrice.toFixed(2)}</p>
        <p>Paper Squares: {paperSquares}</p>
        <p>Paper Square Price: ${costPerSquarePurchase} for {squaresPerPurchase} squares</p>
        <button onClick={produceStraw}>Produce Straw</button>
        <button onClick={increasePrice}>Increase Price</button>
        <button onClick={decreasePrice}>Decrease Price</button>
        <button onClick={purchaseSquares}>Purchase More Squares</button>
      </div>

      <div className="window">
        <div className="window-titlebar">Workforce</div>
        <Workforce
          money={money}
          updateMoney={updateMoney}
          autoStrawsPerSecond={autoStrawsPerSecond}
          updateAutoStrawsPerSecond={updateAutoStrawsPerSecond}
          updateMarketingLevels={updateMarketingLevels}
        />
      </div>
      
      <div className="game-variables">
        <h2>Game Stats</h2>
        <p>Demand: {demand.toFixed(2)}</p>
        <p>Straws Sold Per Second: {strawsSoldPerSecond.toFixed(2)}</p>
        <p>Selling Interval: {sellingInterval.toFixed(2)} ms</p>
        <p>Current Bonuses: {bonuses}</p>
        <p>Current Marketing Levvel: {marketingLevels}</p>
        <p>Straws Auto-Produced per second: {autoStrawsPerSecond}</p>
      </div>
    </div>
  );    
}

export default App;

// const sellStraw = () => {
  //   console.log("Selling a straw");
  //   setStrawsInInventory(prevStraws => {
  //     if (prevStraws > 0) {
  //       setMoney(prevMoney => {
  //         console.log("Adding money:", prevMoney + strawPrice); // Debugging log
  //         return prevMoney + strawPrice;
  //       });
  //       return prevStraws - 1;
  //     } else {
  //       setIsSelling(false);
  //       return prevStraws;
  //     }
  //   });    
  // };

  // const sellStraw = () => {
  //   console.log("Attempting to sell a straw"); // Log before condition check
  //   if (strawsInInventory > 0) {
  //     console.log("Selling a straw"); // Log in the condition
  //     setStrawsInInventory(prev => prev - 1);
  //     setMoney(prev => prev + strawPrice);
  //   } else {
  //     setIsSelling(false);
  //   }
  // };