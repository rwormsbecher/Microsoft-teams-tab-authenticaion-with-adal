import React from "react";
import ReactDOM from "react-dom";
import * as microsoftTeams from "@microsoft/teams-js";
import "./index.css";

import { authContext } from "./adal/adalConfig";

microsoftTeams.initialize();

document.addEventListener("DOMContentLoaded", function() {
    runWithAdal(() => {
        require("./indexApp.js");
    });
});

async function runWithAdal(app) {
    await new Promise(resolve => setTimeout(resolve, 500));

    var href = window.location.href.split("#")[0];
    if (href !== `${window.location.origin}/login-start` && href !== `${window.location.origin}/login-end`) {
        if (!authContext.getCachedToken(authContext.config.clientId) || !authContext.getCachedUser()) {
            microsoftTeams.authentication.authenticate({
                url: `${window.location.origin}/login-start`,
                width: 600,
                height: 535,
                successCallback: result => {
                    let idToken = authContext.getCachedToken(authContext.config.clientId);
                    if (idToken) {
                        app();
                    } else {
                        console.log("Error, could not retrieve the cached id token.");
                    }
                },
                failureCallback: reason => {
                    if (reason === "CancelledByUser" || reason === "FailedToOpenWindow") {
                        const rootElement = document.getElementById("root");
                        console.log("A popup blocker blocked our popup");

                        ReactDOM.render(
                            <React.Fragment>
                                <button onClick={() => runWithAdal(app)}>Login!</button>
                            </React.Fragment>,
                            rootElement
                        );
                    }
                }
            });
        } else {
            app();
        }
    } else {
        app();
    }
}
