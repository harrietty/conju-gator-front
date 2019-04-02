import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  text-align: center;
`;

const FinalScreen = ({ correct, total }) => (
  <Container>
    <h3>Your score:</h3>
    <h2>
      {correct}/{total}
    </h2>
  </Container>
);

FinalScreen.propTypes = {
  correct: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default FinalScreen;
