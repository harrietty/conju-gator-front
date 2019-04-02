import React from "react";
import PropTypes from "prop-types";

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="answerInput">{start}</label>
          <input
            autoFocus
            autoComplete="off"
            type="text"
            id="answerInput"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <p>{original}</p>
          <button type="submit">Check</button>
        </form>
      </div>
    );
  }
}

Question.propTypes = {
  original: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  handleQuestionSubmit: PropTypes.func.isRequired
};

export default Question;
