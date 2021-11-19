import React, { useState } from 'react';
import logo_github from './images/logo_github.png';
import wrench from './images/wrench.png';

import './App.css';

export const App = () => {
    const [crytpoList, setCrytpoList] = useState<string[]>(['BTC', 'ETH', 'EGLD', 'ADA']);
    const [input, setInput] = useState<string>('');

    const listItems = crytpoList.map((crypto, index) =>
        <li className="List-content">
            <a target="_blank" href={"https://www.google.com/search?q=" + crypto}>{crypto}</a>
            <button
                style={{backgroundColor: 'red', width: 20, height: 20}}
                onClick={() => {
                    deleteCrytpoList(index);
                }}
            >X
            </button>
        </li>
    );

    /* delete item in crytpoList*/
    const deleteCrytpoList = (cryptoIndex: number) => {
        const newCrytpoList = crytpoList.filter((_, index) => index !== cryptoIndex);
        setCrytpoList(newCrytpoList);
    }

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInput(event.target.value)
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const newCrytpoList = crytpoList
        newCrytpoList.push(input);
        console.log('newCrytpoList ' + newCrytpoList)
        setCrytpoList(newCrytpoList);
        setInput('')
    }

    return (
        <div className="App">
            <header className="App-header">
                <form onSubmit={handleSubmit}>
                    <input
                        value={input}
                        onChange={handleChange}
                        type='text'
                        placeholder='Add to fav...'
                        id="crypto-search"
                    />
                    <button onClick={handleSubmit} value="Envoyer">
                        Add
                    </button>
                </form>
                <ul className="List">{listItems}</ul>
                <div className="bottom">
                    It's {new Date().toLocaleTimeString()}.
                    <a href="" id="options" className="imageLink"><img alt="option" src={wrench}/></a>
                    <a href="https://github.com/PABourdais/ath-crypto-extension" id="github" className="imageLink"
                       target="_blank"><img alt="github" src={logo_github}/></a>
                </div>
            </header>
        </div>
    );
};

export default App