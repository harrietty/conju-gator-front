import React from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { parse } from "querystring";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { useAuth0 } from "./Auth0Provider";
import QuestionSet from "./QuestionSet";
import PrivacyPolicy from "./PrivacyPolicy";
import Home from "./Home";
import NavBar from "./NavBar";

const MainApp = styled.main`
  padding-top: 100px;
`;

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <div>
        <NavBar />
      </div>
      <MainApp>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route
              exact
              path="/login"
              component={() => (
                <Redirect to="https://conju-gator.eu.auth0.com/authorize" />
              )}
            />
            <Route
              exact
              path="/languages/:language"
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
            <Redirect to="/" />
          </Switch>
        </div>
      </MainApp>
    </Router>
  );
};

App.propTypes = {
  location: PropTypes.object
};

export default App;
