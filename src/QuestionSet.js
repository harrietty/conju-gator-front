import qs from "querystring";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import english from "./data/english.prod.json";
import spanish from "./data/target_languages/spanish.prod.json";

import { generateSet } from "./data/helpers";

import Question from "./Question";
import FinalScreen from "./FinalScreen";

const Container = styled.div`
  margin-top: 50px;
`;

const ProgressContainer = styled.div`
  padding: 0 3%;
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

  extractVerbType = () => {
    const s = qs.parse(this.props.location.search.slice(1));
    return s.verbs ? s.verbs : "all";
  };

  state = {
    question: 0,
    correct: [],
    questions: generateSet({
      english,
      target: spanish,
      tenses: this.extractTenses(),
      length: this.extractQuestionLength(),
      verbType: this.extractVerbType()
    })
  };

  handleQuestionSubmit = response => {
    const { correct } = this.state.questions[this.state.question];
    const newCorrect = this.state.correct.slice();
    if (response.toLowerCase() === correct) newCorrect.push(true);
    else newCorrect.push(false);
    this.setState({
      question: this.state.question + 1,
      correct: newCorrect
    });
  };

  render() {
    const progress = Math.round(
      (this.state.question / this.state.questions.length) * 100
    );
    const progressTheme = {
      success: {
        color: "#0eb9be",
        symbol: progress + "%"
      },
      active: {
        color: "#0eb9be",
        symbol: progress + "%"
      }
    };
    return (
      <Container>
        <ProgressContainer>
          <Progress percent={progress} theme={progressTheme} />
        </ProgressContainer>
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
