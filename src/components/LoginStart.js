import React from "react";
import { authContext } from "../adal/adalConfig";
import Loader from "react-loader-spinner";
import * as microsoftTeams from "@microsoft/teams-js";

import "./loginScreenStyles.css";

export class LoginStart extends React.Component {
    constructor(props) {
        super(props);
        microsoftTeams.initialize();
    }

    componentDidMount() {
        authContext.login();
    }

    render() {
        return (
            <div className="load-spinner-container">
                <Loader type="Oval" color="#3A97DD" height={80} width={80} />
            </div>
        );
    }
}
