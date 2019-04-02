import React from "react";
import english from "./data/english";
import spanish from "./data/target_languages/spanish";

import { generateSet } from "./data/helpers";

import Question from "./Question";
import ProgressIndicator from "./ProgressIndicator";

class QuestionSet extends React.Component {
  state = {
    question: 0,
    correct: [],
    questions: generateSet({
      source: english,
      target: spanish,
      length: 4
    })
  };

  handleQuestionSubmit = response => {
    const { correct } = this.state.questions[this.state.question];
    const newCorrect = this.state.correct.slice();
    if (response === correct) {
      newCorrect.push(1);
    } else {
      newCorrect.push(0);
    }

    this.setState({
      question: this.state.question + 1,
      correct: newCorrect
    });
  };

  render() {
    return (
      <div>
        <h1>Simple Spanish Conjugation Practice</h1>
        <ProgressIndicator correct={this.state.correct} />
        <Question
          {...this.state.questions[this.state.question]}
          handleQuestionSubmit={this.handleQuestionSubmit}
        />
      </div>
    );
  }
}

export default QuestionSet;
