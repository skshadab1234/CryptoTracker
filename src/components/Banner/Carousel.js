import { Container, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../Config/api';
import { CryptoState } from '../../CryptoContext';
import { CircularProgress } from '@material-ui/core';


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CarouselStyle = makeStyles((theme) => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    },
    image: {
        height: 100,
        marginBottom: 20,
        borderRadius: 50
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
    },
}))
const Carousel = () => {
    const classes = CarouselStyle();
    const [coin, setcoin] = useState([]);
    const { currency, symbol } = CryptoState();
    const [flag, setflag] = useState(false);

    const fetchTrending = async () => {
        setflag(true)
        const { data } = await axios.get(TrendingCoins(currency))
        setcoin(data);
        setflag(false)
    }

    useEffect(() => {
        fetchTrending();
    }, [currency]);


    const responsive = {
        0: {
            items: 2,
        },
        768: {
            items: 3
        },
        1024: {
            items: 5
        }
    }

    const items = coin.map((trending) => {
        let profit = trending?.price_change_percentage_24h >= 0;

        if(!flag) {
            return (
                    <Link className={classes.carouselItem} to={`/coin/${trending.id}`}>
                    <img src={trending?.image}
                        alt={trending.name}
                        className={classes.image}
                    />
                    <span>
                        {trending?.symbol}
                        &nbsp;
                        
                    </span>
                    <span style={{ fontSize: 22, fontWeight: 500 }}>
                        {symbol} {numberWithCommas(trending?.current_price.toFixed(2))}
                    </span>
                    <span
                            style={{
                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                fontWeight: 500,
                            }}
                        >
                            {profit && "+"}
                            {trending?.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                </Link>
            )
        }else{
            return (
                <CircularProgress size={150} />
            )
        }
    })

    return (
        <div className={classes.carousel}>
            <Container>
                <AliceCarousel
                    mouseTracking
                    infinite
                    autoPlayInterval={1000}
                    animationDuration={1500}
                    disableDotsControls
                    disableButtonsControls
                    responsive={responsive}
                    items={items}
                    autoPlay
                />
            </Container>
        </div>
    );
};

export default Carousel;
