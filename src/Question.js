import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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

const InputWithIncorrectOption = styled(Input)`
  color: ${props => (props.incorrect ? colors.errorRed : "default")};
`;

class Question extends React.Component {
  state = {
    value: "",
    showingCorrect: false
  };

  _input = React.createRef();
  _input2 = React.createRef();

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const response = this.state.value.toLowerCase();
    if (this.state.showingCorrect || response === this.props.correct) {
      this.setState({
        value: "",
        showingCorrect: false
      });
      this.props.handleQuestionSubmit(response);
      this._button.blur();
      this._input2.current.focus();
    } else if (response !== this.props.correct) {
      this.setState({
        showingCorrect: true
      });
      this._button.focus();
    }
  };

  render() {
    const { original, start } = this.props;
    return (
      <CenterDiv>
        <h5>{this.props.infinitive}</h5>
        <form onSubmit={this.handleSubmit}>
          <Label htmlFor="answerInput">{start}</Label>
          <InputWithIncorrectOption
            width="300px"
            autoFocus
            type="text"
            ref={this._input2}
            id="answerInput"
            autoComplete="off"
            value={this.state.value}
            onChange={this.handleChange}
            incorrect={this.state.showingCorrect}
            shouldBeDisabled={this.state.showingCorrect}
          />
          <p>{original}</p>
          {this.state.showingCorrect && <Error>{this.props.correct}</Error>}
          <Button type="submit" refCallback={c => (this._button = c)}>
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
  infinitive: PropTypes.string.isRequired
};

export default Question;
