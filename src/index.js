import { render } from "react-dom";
import React from "react";
import { Auth0Provider } from "./Auth0Provider";
import history from "./utils/history";

import "./style/grid.css";
import "./style/main.css";
import "./static/android-chrome-192x192.png";
import "./static/android-chrome-512x512.png";
import "./static/apple-touch-icon.png";
import "./static/favicon-16x16.png";
import "./static/favicon-32x32.png";
import "./static/favicon.ico";
// Currently importing so it gets copied into the dist directory, is there a better way?
import "./static/twittercard.png";

import config from "./auth_config.json";

import App from "./App";

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
