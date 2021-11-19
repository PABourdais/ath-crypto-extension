import React, { useState } from 'react';

import './App.css';

export const App = () => {
    const [crytpoList, setCrytpoList] = useState<string[]>(['BTC', 'ETH', 'EGLD', 'ADA']);

    const listItems = crytpoList.map((crypto, index) =>
        <li className="List-content">
            <a target="_blank" href={"https://www.google.com/search?q=" + crypto}>{crypto}</a>

            <button
                style={{backgroundColor: 'red', width: 20, height: 20}}
                onClick={() => {
                deleteCrytpoList(index);
                }}
            >X</button>
        </li>
    );

    /* delete item in crytpoList*/
    const deleteCrytpoList = (cryptoIndex: number) => {
        const newCrytpoList = crytpoList.filter((_, index) => index !== cryptoIndex);
        setCrytpoList(newCrytpoList);
    }

    return (
        <div className="App">
            <header className="App-header">
                <ul className="List">{listItems}</ul>
                <p>Il est {new Date().toLocaleTimeString()}.</p>
            </header>
        </div>
    );
};

export default App