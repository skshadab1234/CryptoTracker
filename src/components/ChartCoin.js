import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../Config/api";
import { Line } from "react-chartjs-2";
import {
    CircularProgress,
    createTheme,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core";
import SelectButton from "./SelectButton";
import { chartDays } from "../Config/data";
import { CryptoState } from "../CryptoContext";
import { Grid } from '@material-ui/core';

const ChartCoin = ({ coin }) => {
    const [historicData, setHistoricData] = useState([]);
    const [days, setDays] = useState(1);
    const { currency } = CryptoState();
    const [flag, setflag] = useState(false);

    const useStyles = makeStyles((theme) => ({
        chart: {
            width: "70%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            padding: 40,
            [theme.breakpoints.down("md")]: {
                width: "100%",
                marginTop: 0,
                padding: 20,
                paddingTop: 0,
            },
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            background: 'none',
            color: '#fff',
            marginTop: 20
        },
    }));

    const classes = useStyles();

    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
        setflag(true);
        setHistoricData(data.prices);
    };

    console.log(coin);

    useEffect(() => {
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days, currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });


    const data = {
        labels: historicData.map((coin) => {
            let date = new Date(coin[0]);
            let time =
                date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
        }),

        datasets: [
            {
                data: historicData.map((coin) => coin[1].toFixed()),
                label: `Price ( Past ${days} Days ) in ${currency}`,
                borderColor: "gold",
            },
        ],


    };
    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.chart}>
                {!historicData | flag === false ? (
                    <CircularProgress
                        style={{ color: "gold" }}
                        size={250}
                        thickness={1}
                    />
                ) : (
                    <>
                        <Line data={data} options={{
                            elements: {
                                point: {
                                    radius: 1,
                                },
                            },
                            responsive: true,
                        }}

                        />
                        <Grid container spacing={3}>

                            {chartDays.map((day) => (
                                <Grid item lg={1} md={2} sm={2} xs={4} style={{ marginTop: 40 }}>
                                    <SelectButton
                                        key={day.value}
                                        onClick={() => {
                                            setDays(day.value);
                                            setflag(false);
                                        }}

                                        selected={day.value === days}
                                    >
                                        {day.label}
                                    </SelectButton>
                                </Grid>

                            ))}
                        </Grid>

                    </>
                )}
            </div>
        </ThemeProvider >
    );
};

export default ChartCoin;
