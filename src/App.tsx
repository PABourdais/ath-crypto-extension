import React, { useState } from 'react';

import './App.css';

export const App = () => {
  const [crytpoList, setCrytpoList] = useState<string[]>(['BTC', 'ETH', 'EGLD', 'ADA']);

  const listItems = crytpoList.map((crypto) =>
      <li>{crypto}</li>
  );

  return (
      <div className="App">
        <header className="App-header">
          <ul>{listItems}</ul>
          <p>Il est {new Date().toLocaleTimeString()}.</p>
        </header>
      </div>
  );
};

export default App