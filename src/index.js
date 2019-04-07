import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import QuestionSet from "./QuestionSet";
import Home from "./Home";
import Nav from "./Nav";

import "./style/main.css";
import "./static/android-chrome-192x192.png";
import "./static/android-chrome-512x512.png";
import "./static/apple-touch-icon.png";
import "./static/favicon-16x16.png";
import "./static/favicon-32x32.png";
import "./static/favicon.ico";
// import "./static/site.webmanifest";

ReactDOM.render(
  <Router>
    <div>
      <Nav />
    </div>
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route exact path="/:language" component={QuestionSet} />
    </div>
  </Router>,
  document.getElementById("root")
);
