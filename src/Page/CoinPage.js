import "../App.css"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../Config/api';
import { CryptoState } from '../CryptoContext';
import { LinearProgress, makeStyles, Typography, Grid, Box, Button } from '@material-ui/core';
import ChartCoin from '../components/ChartCoin';
import parse from 'html-react-parser';


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    color: "#fff",
    marginTop: 25,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  sidebar: {
    width: "30%",
    borderRight: "0px solid grey",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      borderRight: "0px solid grey",
    },
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRight: "2px solid grey",
    padding: 10
  },
  image: {
    width: "200px"
  },
  coinName: {
    fontSize: "2rem",
    fontWeight: "bold",
    margin: 20,
    [theme.breakpoints.down('sm')]: {
      fontSize: "1.5rem"
    }
  },
  description: {
    fontSize: 20,
    padding: 25,
    width: "100%",
    textAlign: "justify",
    paddingBottom: '15px',
    paddingTop: 0,
    [theme.breakpoints.down('md')]: {
      fontSize: "1rem"
    }
  },
  marketPlace: {
    alignSelf: 'start',
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: '1rem'
    },
    [theme.breakpoints.down('xs')]: {
      alignItems: "start"
    }
  },
  heading: {
    fontWeight: "bold",
    [theme.breakpoints.down('md')]: {
      fontSize: 16
    }
  },
  Box: {
    backgroundColor: "#053051",
    width: "100%",
    padding: 20,
    borderRadius: 5,
    boxShadow: "9px 12px 29px -6px rgba(0,0,0,1.81)",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

export default function Coin() {
  const classes = useStyles();

  const { id } = useParams();
  const [coin, setcoin] = useState();
  const { currency, symbol } = CryptoState()

  const fetchApiCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))
    document.title = data.name.toUpperCase() + ' (' + data.symbol + ')'

    setcoin(data);
  }

  useEffect(() => {
    fetchApiCoin();
  }, []);


  if (!coin) return (<><LinearProgress />
    <LinearProgress color="secondary" />
  </>)


  return (

    <>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            className={classes.image}
          />
          <Typography className={classes.coinName}>
            {coin.name}
          </Typography>
          <Typography variant="subbtitle2" className={classes.description}>
            {parse(coin.description.en.split('. ')[0])}.
          </Typography>

          <div className={classes.marketPlace} >
            <span style={{ display: "flex", marginBottom: '20px' }}>
              <Typography variant="h5" className={classes.heading} >
                Rank : {coin?.market_cap_rank}
              </Typography>
            </span>
            <span style={{ display: "flex", marginBottom: '20px' }}>
              <Typography variant="h5" className={classes.heading} >
                Current Price : {" "}
                {symbol}{" "}{numberWithCommas(coin.market_data.current_price[currency.toLowerCase()])}
              </Typography>
            </span>
            <span style={{ display: "flex", marginBottom: '20px' }}>
              <Typography variant="h5" className={classes.heading} >
                Market Cap : {" "}
                {symbol}{" "}{numberWithCommas(coin.market_data.market_cap[currency.toLowerCase()]).toString().slice(0, -6)}M
              </Typography>
            </span>
            <span style={{ display: "flex", marginBottom: '20px' }}>
              <Typography variant="h5" className={classes.heading} >
                Total Volume : {" "}
                {symbol}{" "}{numberWithCommas(coin.market_data.total_volume[currency.toLowerCase()]).toString().slice(0, -6)}M
              </Typography>
            </span>
          </div>
        </div>
        {/* Chart  */}
        <ChartCoin coin={coin} />
      </div>

      {/* <div style={{ padding: 20 }}>
        <Typography variant="h2" className={classes.heading} align={"center"} style={{marginTop: 30}}>
            Crypto Prices
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={3} md={4} xs={6} style={{ marginTop: 40 }}>
            <Box className={classes.Box} m={1}>
            <Typography variant="h5" > 
                High 24h
              </Typography>
              <Typography variant="h5" > 
                 {symbol}{" "}{numberWithCommas(coin?.market_data.high_24h[currency.toLowerCase()])} 
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={3} md={4} xs={6} style={{ marginTop: 40 }}>
            <Box className={classes.Box} m={1}>
            <Typography variant="h5" > 
                Low 24h
              </Typography>
              <Typography variant="h5" > 
                 {symbol}{" "}{numberWithCommas(coin?.market_data.low_24h[currency.toLowerCase()])}
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={3} md={4} xs={6} style={{ marginTop: 40 }}>
            <Box className={classes.Box} m={1}>
            <Typography variant="h5" > 
                24 Change
              </Typography>
              <Typography variant="h5" > 
                 {symbol}{" "}{numberWithCommas(coin?.market_data.price_change_24h)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div> */}
    </>


  );
}
