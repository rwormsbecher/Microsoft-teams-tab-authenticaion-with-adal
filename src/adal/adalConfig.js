import { AuthenticationContext, adalFetch } from "react-adal";
import * as microsoftTeams from "@microsoft/teams-js";

export const adalConfig = {
    clientId: "fe2eed8-5785-47ca-971d-e1b03304db0d",
    redirectUri: `${window.location.origin}/login-end`,
    endpoints: {
        graphApi: "https://graph.microsoft.com/"
    },
    cacheLocation: "localStorage",
    popUp: false,
    callback: function(errorDesc, token, error, tokenType) {
        if (!error) {
            microsoftTeams.authentication.notifySuccess();
        } else {
            microsoftTeams.authContext.notifyFailure();
        }
    }
};

export const authContext = new AuthenticationContext(adalConfig);

// --== Http client which adds token to api call ==--
export const adalGraphFetch = (fetch, url, options) =>
    adalFetch(authContext, adalConfig.endpoints.graphApi, fetch, url, options);

// --== Get token from localstorage == --
export const getGraphToken = () => {
    return authContext.getCachedToken(authContext.config.endpoints.graphApi);
};

// --== Acquire api token ==--
export const acquireGraphToken = async () => {
    await authContext.acquireToken(adalConfig.endpoints.graphApi, (message, token, msg) => {
        return token;
    });

    return null;
};
