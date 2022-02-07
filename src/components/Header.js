import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import { makeStyles, Select, MenuItem, ThemeProvider, createTheme } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { CryptoState } from '../CryptoContext';


function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

const HeaderStyle = makeStyles((theme) => ({
    appbar: {
        backgroundColor: '#050a30',
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        fontSize: 25,
        fontWeight: "bold",
        flex: 1,
        color: '#fff',
        cursor: 'pointer'
    }
}));

const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        type: 'dark',
    },
});

export default function Header(props) {
    const classes = HeaderStyle();
    let history = useHistory();

    function handleClick() {
        history.push("/");
    }

    const { currency, setCurrency } = CryptoState()
    console.log(currency)
    return (
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <HideOnScroll {...props}>
                    <AppBar className={classes.appbar}>
                        <Container>
                            <Toolbar>
                                <Typography variant="h5" className={classes.logo} onClick={handleClick}>Krypt</Typography>
                                <Select variant='outlined' labelId="demo-simple-select-label" id="demo-simple-select"  style={{ width: 100, height: 40, marginLeft: 15 }}
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                >
                                    <MenuItem value={"INR"}>INR</MenuItem>
                                    <MenuItem value={'USD'}>USD</MenuItem>
                                </Select>
                            </Toolbar>
                        </Container>
                    </AppBar>
                </HideOnScroll>
                <Toolbar />
            </ThemeProvider>
    );
}
