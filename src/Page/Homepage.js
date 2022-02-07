import React from 'react';
import Banner from '../components/Banner/Banner';
import CoinTable from "../components/CoinTable"

const Homepage = () => {
    document.title = 'CryptoCurrency Checker';

  return (
        <>
          <Banner />
          <CoinTable />
        </>
        );
};

export default Homepage;
