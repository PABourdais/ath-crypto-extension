import React, {useEffect, useState} from 'react';
import Axios from "axios";

import {useChromeStorageLocal} from 'use-chrome-storage';

import logo_github from './images/logo_github.png';
import wrench from './images/wrench.png';
import trash from './images/trash.png';

import './App.css';

export const App = () => {
    const [crytpoList, setCrytpoList] = useState<string[]>(['']);
    const [crytpoListFav, setCrytpoListFav, isPersistent, error] = useChromeStorageLocal('counterLocal', crytpoList);

    const [search, setSearch] = useState<string>("");

    /*    {
            "id" : "bitcoin",
            "icon" : "https://static.coinstats.app/coins/Bitcoin6l39t.png",
            "name" : "Bitcoin",
            "symbol" : "BTC",
            "rank" : 1,
            "price" : 58484.279460425045,
            "priceBtc" : 1,
            "volume" : 33504237841.258633,
            "marketCap" : 1104098744913.284,
            "availableSupply" : 18878556,
            "totalSupply" : 21000000,
            "priceChange1h" : -0.12,
            "priceChange1d" : 1.46,
            "priceChange1w" :  -7.94,
            "websiteUrl" : "http://www.bitcoin.org",
            "twitterUrl" : "https://twitter.com/bitcoin",
            "exp" : ["https://blockchair.com/bitcoin/", "https://btc.com/", "https://btc.tokenview.com/"]
        }*/
    useEffect(() => {
        Axios.get(
            `https://api.coinstats.app/public/v1/coins?skip=0&limit=100¤cy=INR`
        ).then((res) => {
            const cryptoListInit: string[] = []
            res.data.coins.map((crypto: { symbol: any; }) => {

                cryptoListInit.push(crypto.symbol)
            })
            setCrytpoList(cryptoListInit);
        });
    }, []);

    const listItems = crytpoListFav.map((crypto: {} | null | undefined, index: number) =>
        <li className="List-content">
            <a target="_blank" href={"https://www.google.com/search?q=" + crypto}>{crypto}</a>
            - 500 $
            <button
                onClick={() => {
                    deleteCrytpoListFav(index);
                }}
            >
                <img alt="remove" src={trash}/>
            </button>
        </li>
    );

    /* delete item in crytpoList*/
    const deleteCrytpoListFav = (cryptoIndex: number) => {
        const newCrytpoList = crytpoListFav.filter((_: any, index: number) => index !== cryptoIndex);
        setCrytpoListFav(newCrytpoList);
    }

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearch(event.target.value)
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const newCrytpoList = crytpoListFav

        if (crytpoList.includes(search)) {
            newCrytpoList.unshift(search);
            setCrytpoListFav(newCrytpoList);
            setSearch('')
        } else {
            console.log('search is not in crytpoList')
        }

    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>ATH crypto extension</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        value={search}
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