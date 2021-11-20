import React, {useEffect, useState} from 'react';
import Axios from "axios";

import {useChromeStorageLocal} from 'use-chrome-storage';

import {crypto} from "./types";

import logo_github from './images/logo_github.png';
import wrench from './images/wrench.png';

import './App.css';

export const App = () => {
    const [cryptoList, setCryptoList] = useState<crypto[]>([]);
    const [cryptoListFav, setCryptoListFav, isPersistent, error] = useChromeStorageLocal('counterLocal', cryptoList);

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
            const cryptoListInit: crypto[] = []
            res.data.coins.map((crypto: crypto) => {
                let cryptoResponse = {
                    id: crypto.id,
                    icon: crypto.icon,
                    name: crypto.name,
                    symbol: crypto.symbol,
                    rank: crypto.rank,
                    price: crypto.price,
                    priceBtc: crypto.priceBtc,
                    priceChange1h : crypto.priceChange1h,
                    priceChange1d : crypto.priceChange1d,
                    websiteUrl :  crypto.websiteUrl,
                }
                cryptoListInit.push(cryptoResponse)
            })
            setCryptoList(cryptoListInit);
        });
    }, []);

    /* delete item in cryptoList*/
    const deleteCryptoListFav = (cryptoIndex: number) => {
        const newCryptoList = cryptoListFav.filter((_: any, index: number) => index !== cryptoIndex);
        setCryptoListFav(newCryptoList);
    }

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearch(event.target.value)
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const newCryptoList = cryptoListFav
        cryptoList.forEach(crypto => {
            if (crypto.symbol === search){
                newCryptoList.unshift(crypto);
                setCryptoListFav(newCryptoList);
                setSearch('')
            }
        })
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
                    <button onClick={handleSubmit} value="Envoyer" className="button-form">
                        Add
                    </button>
                </form>
                <table>
                    <thead>
                    <tr>
                        <td>Rank</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>24h Change</td>
                        <td>Remove</td>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Filtering to check for the searched crypto */}
                    {cryptoListFav.map((crypto: crypto, id: number) => {
                        return (
                            <>
                                <tr id={id.toString()}>
                                    <td className="rank">{crypto.rank}</td>
                                    <td className="logo">
                                        <a href={crypto.websiteUrl}>
                                            <img src={crypto.icon} alt="logo"
                                                 width="30px"/>
                                        </a>
                                        <p>{crypto.name}</p>
                                        <p className="symbol">• {crypto.symbol}</p>
                                    </td>
                                    <td>{crypto.price.toFixed(2)}$</td>
                                    <td>{crypto.priceChange1d}</td>
                                    <td>
                                        <button className="button-delete"
                                            onClick={() => {
                                                deleteCryptoListFav(id);
                                            }}
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            </>
                        );
                    })}
                    </tbody>
                </table>
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