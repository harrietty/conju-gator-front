import qs from "querystring";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import english from "./data/english";
import spanish from "./data/target_languages/spanish";

import { generateSet } from "./data/helpers";

import Question from "./Question";
import ProgressIndicator from "./ProgressIndicator";
import FinalScreen from "./FinalScreen";

const Container = styled.div`
  margin-top: 50px;
`;

class QuestionSet extends React.Component {
  extractTenses = () => {
    const s = qs.parse(this.props.location.search.slice(1));
    return s.tenses ? s.tenses.split(",") : [];
  };

  extractQuestionLength = () => {
    const s = qs.parse(this.props.location.search.slice(1));
    return s.questions ? Number(s.questions) : 30;
  };

  state = {
    question: 0,
    correct: [],
    questions: generateSet({
      english,
      target: spanish,
      tenses: this.extractTenses(),
      length: this.extractQuestionLength()
    })
  };

  handleQuestionSubmit = response => {
    const { correct } = this.state.questions[this.state.question];
    const newCorrect = this.state.correct.slice();
    if (response === correct) newCorrect.push(true);
    else newCorrect.push(false);
    this.setState({
      question: this.state.question + 1,
      correct: newCorrect
    });
  };

  render() {
    return (
      <Container>
        <ProgressIndicator
          correct={this.state.correct}
          total={this.state.questions.length}
        />
        {this.state.question === this.state.questions.length ? (
          <FinalScreen
            correct={this.state.correct.filter(c => c).length}
            total={this.state.questions.length}
          />
        ) : (
          <Question
            {...this.state.questions[this.state.question]}
            handleQuestionSubmit={this.handleQuestionSubmit}
          />
        )}
      </Container>
    );
  }

  static propTypes = {
    location: PropTypes.object.isRequired
  };
}

export default QuestionSet;
