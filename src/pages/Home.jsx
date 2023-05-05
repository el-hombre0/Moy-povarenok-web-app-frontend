import {Tabs, Tab, Grid} from "@material-ui/core"
import React, { useEffect } from "react";
import axios from "../axios";

function Home(){
    React.useEffect(() => {
        axios.get('/dishes')
    }, []);

    return <>
    <Tabs>
        <Tab label="Новые"/>
    </Tabs>

    <Grid container spacing={4}>
        <Grid xs={8} item>

        </Grid>
    </Grid>
    </>
};

export default Home;