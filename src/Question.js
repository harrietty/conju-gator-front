import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "./Reusable/Button";
import Input from "./Reusable/Input";

const CenterDiv = styled.div`
  text-align: center;
`;

const Label = styled.label`
  margin-right: 8px;
  font-size: 1.4rem;
`;

class Question extends React.Component {
  state = {
    value: ""
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const response = this.state.value;
    this.setState({
      value: ""
    });
    this.props.handleQuestionSubmit(response);
  };

  render() {
    const { original, start } = this.props;
    return (
      <CenterDiv>
        <form onSubmit={this.handleSubmit}>
          <Label htmlFor="answerInput">{start}</Label>
          <Input
            width="300px"
            autoFocus
            autoComplete="off"
            type="text"
            id="answerInput"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <p>{original}</p>
          <Button type="submit">Check</Button>
        </form>
      </CenterDiv>
    );
  }
}

Question.propTypes = {
  original: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  handleQuestionSubmit: PropTypes.func.isRequired
};

export default Question;
