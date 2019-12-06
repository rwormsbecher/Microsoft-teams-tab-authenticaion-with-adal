import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { LoginEnd } from "./components/LoginEnd";
import { Home } from "./components/Home";
import { LoginStart } from "./components/LoginStart";

export default class App extends React.Component {
    static displayName = App.name;

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" Component={Home} />
                    <Route path="/login-start" Component={LoginStart} />
                    <Route exact path="/login-end" Component={LoginEnd} />
                </Switch>
            </BrowserRouter>
        );
    }
}
