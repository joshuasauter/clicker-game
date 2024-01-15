import React from 'react';

function Upgrades({ money, purchaseUpgrade }) {
  const upgrades = [
    { id: 'Computer', title: 'Computer', cost: 200, description: 'Get a computer to increase efficiency.' },
    { id: 'Marketing', title: 'Save the Turtles Marketing Campaign', cost: 1000, description: 'Boost your marketing with a save the turtles campaign.' },
    { id: 'SquaresContract', title: 'Paper Squares Bulk Contract', cost: 500, description: 'Double your paper squares per purchase.' }
  ];

  return (
    <div className="window window-upgrades">
      <div className="window-titlebar">Upgrades</div>
      {upgrades.map((upgrade) => (
        <div key={upgrade.id} className="upgrade-item">
          <h3>{upgrade.title}</h3>
          <p>{upgrade.description}</p>
          <button 
            onClick={() => purchaseUpgrade(upgrade.cost, upgrade.id)}
            disabled={money < upgrade.cost}
          >
            Purchase for ${upgrade.cost}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Upgrades;
