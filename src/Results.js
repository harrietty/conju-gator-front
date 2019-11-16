import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as colors from "./style/colors";

const Container = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${colors.green};
  max-height: 400px;
  overflow-y: scroll;
  padding: 0 10px;
  width: 50%;
  min-width: 350px;
  margin: 20px auto;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Question = styled.p`
  font-size: 0.9em;
  text-align: left;
`;

const Answer = styled.p`
  font-size: 0.9em;
  color: ${props => (props.correct ? colors.green : colors.errorRed)};
`;

const Icon = styled.i`
  color: ${props => (props.correct ? colors.green : colors.errorRed)};
  margin-left: 7px;
`;

class Results extends React.Component {
  render() {
    const all = this.props.correct
      .map(i => {
        i.correct = true;
        return i;
      })
      .concat(
        this.props.incorrect.map(i => {
          i.correct = false;
          return i;
        })
      );
    return (
      <Container>
        {all.map((item, i) => (
          <Item key={i}>
            <Question>{item.question}</Question>
            <Answer correct={item.correct}>
              {item.answer}
              <Icon
                className={`fas fa-${item.correct ? "check" : "times"}-circle`}
                correct={item.correct}
              ></Icon>
            </Answer>
          </Item>
        ))}
      </Container>
    );
  }
}

Results.propTypes = {
  correct: PropTypes.array.isRequired,
  incorrect: PropTypes.array.isRequired
};

export default Results;
