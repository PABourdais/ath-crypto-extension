import React, { useState } from 'react';

import {useChromeStorageLocal} from 'use-chrome-storage';

import logo_github from './images/logo_github.png';
import wrench from './images/wrench.png';
import trash from './images/trash.png';

import './App.css';

export const App = () => {
    const [crytpoList, setCrytpoList, isPersistent, error] = useChromeStorageLocal('counterLocal', ['BTC', 'ETH', 'EGLD', 'ADA']);

    const [input, setInput] = useState<string>('');

    const listItems = crytpoList.map((crypto: {} | null | undefined, index: number) =>
        <li className="List-content">
            <a target="_blank" href={"https://www.google.com/search?q=" + crypto}>{crypto}</a>
            - 500 $
            <button
                onClick={() => {
                    deleteCrytpoList(index);
                }}
            >
                <img alt="remove" src={trash}/>
            </button>
        </li>
    );

    /* delete item in crytpoList*/
    const deleteCrytpoList = (cryptoIndex: number) => {
        const newCrytpoList = crytpoList.filter((_: any, index: number) => index !== cryptoIndex);
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
                <h1>ATH crypto extension</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        value={input}
                        onChange={handleChange}
                        type='text'
                        placeholder='Add to fav...'
                        id="crypto-search"
                    />
                    <button onClick={handleSubmit} value="Envoyer" className="Button-form">
                        Add
                    </button>
                </form>
                <ul className="List">{listItems}</ul>
                <div className="bottom">
                    <a href="" id="options" className="imageLink"><img alt="option" src={wrench}/></a>
                    {new Date().toLocaleTimeString()}
                    <a href="https://github.com/PABourdais/ath-crypto-extension" id="github" className="imageLink"
                       target="_blank"><img alt="github" src={logo_github}/></a>
                </div>
            </header>
        </div>
    );
};

export default App