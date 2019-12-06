import React, { Component } from "react";
import { authContext } from "../adal/adalConfig";
import Loader from "react-loader-spinner";
import * as microsoftTeams from "@microsoft/teams-js";

import "./loginScreenStyles.css";

export class LoginEnd extends Component {
    componentDidMount() {
        // if the callback includes the hash for the redirect.
        if (authContext.isCallback(window.location.hash)) {
            authContext.handleWindowCallback(window.location.hash);

            // check whether the user was able to sign in.
            if (authContext.getCachedUser()) {
                microsoftTeams.authentication.notifySuccess();
            } else {
                microsoftTeams.authentication.notifyFailure(authContext.getLoginError());
            }
        }
    }

    render() {
        return (
            <div class="load-spinner-container">
                <Loader type="Oval" color="#3A97DD" height={80} width={80} />
            </div>
        );
    }
}
