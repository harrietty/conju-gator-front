import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "./Reusable/Button";

import Results from "./Results";

const Container = styled.div`
  text-align: center;
`;

const FinalScreen = props => (
  <Container>
    <h3>{props.streakMode ? "Your streak:" : "Your score:"}</h3>
    <h2>
      {props.streakMode
        ? props.correct.length
        : props.correct.length / props.total}
    </h2>
    <Results correct={props.correct} incorrect={props.incorrect} />
    <Link to="/">
      <Button color="white" backgroundColor="green">
        Home
      </Button>
    </Link>
  </Container>
);

FinalScreen.propTypes = {
  correct: PropTypes.array.isRequired,
  incorrect: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  streakMode: PropTypes.bool.isRequired
};

export default FinalScreen;
