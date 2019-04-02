import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import QuestionSet from "./QuestionSet";
import Home from "./Home";
import Nav from "./Nav";

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
