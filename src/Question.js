import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import AccentedOptions from "./AccentedOptions";
import Button from "./Reusable/Button";
import Input from "./Reusable/Input";
import Error from "./Reusable/Error";
import * as colors from "./style/colors";

const CenterDiv = styled.div`
  text-align: center;
`;

const Label = styled.label`
  margin-right: 8px;
  font-size: 1.4rem;
`;

const H5 = styled.h5`
  margin: 10px 0 30px 0;
  font-size: 0.9rem;
`;

const P = styled.p`
  margin-bottom: 0px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const InputWithIncorrectOption = styled(Input)`
  color: ${props => (props.incorrect ? colors.errorRed : "default")};
`;

class Question extends React.Component {
  state = {
    value: "",
    showingCorrect: false
  };

  _input = React.createRef();

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let response = this.state.value.toLowerCase();
    if (this.props.isReflexive) {
      const reflexivePronoun = this.props.correct.match(/([a-z]+\s)/)[1];
      response = `${reflexivePronoun}${response}`;
    }
    if (this.state.showingCorrect || response === this.props.correct) {
      this.setState({
        value: "",
        showingCorrect: false
      });
      this.props.handleQuestionSubmit(response);
    } else if (response !== this.props.correct) {
      this.setState({
        showingCorrect: true
      });
    }
  };

  handleAccentSelection = e => {
    const isAccentSelect = Array.from(e.target.classList).includes(
      "accentSelect"
    );
    // Otherwise is a normal form submission
    if (isAccentSelect) e.preventDefault();

    // Update input area with selected accented letter
    this.setState({
      value: this.state.value + e.target.innerText
    });
    this._input.current.focus();
  };

  render() {
    const { original, start } = this.props;
    let reflexiveStart = "";
    if (this.props.isReflexive) {
      reflexiveStart = this.props.correct.match(/([a-z]+)\s/)[1];
    }
    return (
      <CenterDiv>
        <P>{original}</P>
        <H5>({this.props.infinitive})</H5>
        <form onSubmit={this.handleSubmit}>
          <Flex>
            <div>
              <Label htmlFor="answerInput">
                {start} {reflexiveStart}
              </Label>
            </div>
            <div>
              <InputWithIncorrectOption
                width="300px"
                autoFocus
                type="text"
                ref={this._input}
                id="answerInput"
                autoComplete="off"
                value={this.state.value}
                onChange={this.handleChange}
                incorrect={this.state.showingCorrect}
                shouldBeDisabled={this.state.showingCorrect}
              />
              <AccentedOptions
                handleAccentSelection={this.handleAccentSelection}
              />
            </div>
          </Flex>
          {this.state.showingCorrect && <Error>{this.props.correct}</Error>}
          <Button color="white" backgroundColor="green" type="submit">
            {this.state.showingCorrect ? "Next" : "Check"}
          </Button>
        </form>
      </CenterDiv>
    );
  }
}

Question.propTypes = {
  original: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  correct: PropTypes.string.isRequired,
  handleQuestionSubmit: PropTypes.func.isRequired,
  infinitive: PropTypes.string.isRequired,
  isReflexive: PropTypes.bool.isRequired
};

export default Question;
