import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../Config/api';
import { CryptoState } from '../CryptoContext';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';

const CoinPage = () => {
    const { id } = useParams()
    document.title = id.toUpperCase();

    const [singleCoin, setsingleCoin] = useState([]);
    const { currency } = CryptoState();
    const [ loading, setLoading ] = useState(false)
   
    const fetchSingleCoin = async () => {
      setLoading(true)
      const { data } = await axios.get(SingleCoin(id));
      setsingleCoin(data);
      setLoading(false)
    }


    useEffect(() => {
      fetchSingleCoin();
    }, [currency]);
    


    if (loading) return (
      <>
      <LinearProgress />
      <LinearProgress color="secondary" />
      </>
    );
  return <div>Coin Page</div>;
};

export default CoinPage;
