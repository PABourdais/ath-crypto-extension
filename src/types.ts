export enum Sender {
    React,
    Content
}

export interface ChromeMessage {
    from: Sender,
    message: any
}

export interface cryptoResponse {
    id: string;
    icon: string;
    name: string;
    symbol: string;
    rank: number;
    price: number;
    priceBtc: number;
    volume: number;
    marketCap: number;
    availableSupply: number;
    totalSupply : number;
    priceChange1h : number;
    priceChange1d : number;
    priceChange1w : number;
    websiteUrl : string;
    twitterUrl : string;
    exp : string[];
}

export interface crypto {
    id: string;
    icon: string;
    name: string;
    symbol: string;
    rank: number;
    price: number;
    priceBtc: number;
    priceChange1h : number;
    priceChange1d: number;
    websiteUrl : string;
}

