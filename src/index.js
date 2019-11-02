import { parse } from "querystring";
import { render } from "react-dom";
import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import QuestionSet from "./QuestionSet";
import Home from "./Home";
import Nav from "./Nav";

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

render(
  <Router>
    <div>
      <Nav />
    </div>
    <main>
      <div className="container">
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/:language"
          render={props => {
            const s = parse(props.location.search.slice(1));

            // If the verb type doesn't make sense, set it to "all"
            let verbType = s.verbs;
            if (
              !["all", "irregular", "common", "specific"].includes(verbType)
            ) {
              verbType = "all";
            }

            // If the tenses don't make sense, set them to the default
            const tenseChoices = [
              "present",
              "preterite",
              "imperfect",
              "conditional",
              "future"
            ];
            let tenses = s.tenses || "";

            if (!tenses.split(",").every(t => tenseChoices.includes(t))) {
              tenses = tenseChoices.join(",");
            }

            const search = `?verbs=${verbType}&questions=30&tenses=${tenses}`;
            if (
              (s.questions && Number(s.questions) > 300) ||
              verbType !== s.verbs ||
              s.tenses !== tenses
            ) {
              return (
                <Redirect
                  to={{
                    pathname: props.location.pathname,
                    search: search
                  }}
                />
              );
            } else {
              return <QuestionSet {...props} />;
            }
          }}
        />
      </div>
    </main>
  </Router>,
  document.getElementById("root")
);
