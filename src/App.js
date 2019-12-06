import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { LoginEnd } from "./components/LoginEnd";
import { Home } from "./components/Home";
import { LoginStart } from "./components/LoginStart";

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login-start" component={LoginStart} />
                    <Route exact path="/login-end" component={LoginEnd} />
                </Switch>
            </BrowserRouter>
        );
    }
}
