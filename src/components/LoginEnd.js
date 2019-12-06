import React from "react";
import { authContext } from "../adal/adalConfig";
import Loader from "react-loader-spinner";
import * as microsoftTeams from "@microsoft/teams-js";

import "./loginScreenStyles.css";

export class LoginEnd extends React.Component {
    componentDidMount() {
        // callback includes the token hash.
        if (authContext.isCallback(window.location.hash)) {
            authContext.handleWindowCallback(window.location.hash);

            // whether there is a user in the cacheStorage
            if (authContext.getCachedUser()) {
                microsoftTeams.authentication.notifySuccess();
            } else {
                microsoftTeams.authentication.notifyFailure(authContext.getLoginError());
            }
        }
    }

    render() {
        return (
            <div className="load-spinner-container">
                <Loader type="Oval" color="#3A97DD" height={80} width={80} />
            </div>
        );
    }
}
