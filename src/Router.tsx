import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Coins from "./routes/Coins.tsx";
import Coin from "./routes/Coin.tsx";





function Router(){
    return <BrowserRouter>
        <Switch>

            <Route path="/:coinId">
                <Coin/>
            </Route>
            <Route path="/">
                <Coins/>
            </Route>
        </Switch>
    </BrowserRouter>
}


export default Router;