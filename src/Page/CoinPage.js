import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../Config/api';
import { CryptoState } from '../CryptoContext';

const CoinPage = () => {
    const { id } = useParams()
    document.title = id.toUpperCase();

    const [singleCoin, setsingleCoin] = useState([]);
    const { currency } = CryptoState();
   
    const fetchSingleCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));
      setsingleCoin(data);

    }


    useEffect(() => {
      fetchSingleCoin();
    }, [currency]);
    


    if (!singleCoin) return "Hey";
  return <div>Coin Page</div>;
};

export default CoinPage;
