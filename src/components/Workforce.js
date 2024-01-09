import React, { useState } from 'react';

function Workforce(props) {
  const [rollerCount, setRollerCount] = useState(0);
  const [rollerPrice, setRollerPrice] = useState(10); // Initial price for rollers
  const [marketerCount, setMarketerCount] = useState(0);
  const [marketerPrice, setMarketerPrice] = useState(20); // Initial price for marketers

  const purchaseRoller = () => {
    if (props.money >= rollerPrice) {
      setRollerCount(currentCount => currentCount + 1);
      props.updateMoney(currentMoney => currentMoney - rollerPrice);
      props.updateAutoStrawsPerSecond(currentStraws => currentStraws + 1);
  
      // Update roller price based on new count
      setRollerPrice(1.2 ** (rollerCount + 1) + 10);
    } else {
      console.log("Not enough money to purchase a roller");
    }
  };
  
  const purchaseMarketer = () => {
    if (props.money >= marketerPrice) {
      setMarketerCount(currentCount => currentCount + 1);
      props.updateMoney(currentMoney => currentMoney - marketerPrice);
      props.updateMarketingLevels(currentLevels => currentLevels + 1);
  
      // Update marketer price based on new count
      setMarketerPrice(4 ** (marketerCount + 1) * 100);
    } else {
      console.log("Not enough money to purchase a marketer");
    }
  };
  

  return (
    <div>
      <h2>Workforce</h2>
      <div>
        <p>Rollers: {rollerCount} (Price: ${rollerPrice.toFixed(2)})</p>
        <button onClick={purchaseRoller}>Purchase Roller</button>
      </div>
      <div>
        <p>Marketers: {marketerCount} (Price: ${marketerPrice.toFixed(2)})</p>
        <button onClick={purchaseMarketer}>Purchase Marketer</button>
      </div>
    </div>
  );
}

export default Workforce;
