import { parse } from "querystring";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

import { generateSet } from "./data/helpers";

import Question from "./Question";
import FinalScreen from "./FinalScreen";
import Error from "./Reusable/Error";

const Container = styled.div`
  margin-top: 50px;
`;

const ProgressContainer = styled.div`
  padding: 0 3%;
`;

const CenterDiv = styled.div`
  text-align: center;
`;

class QuestionSet extends React.Component {
  extractTenses = () => {
    const s = parse(this.props.location.search.slice(1));
    return s.tenses ? s.tenses.split(",") : [];
  };

  extractQuestionLength = () => {
    const s = parse(this.props.location.search.slice(1));
    return s.questions ? Number(s.questions) : 30;
  };

  extractVerbType = () => {
    const s = parse(this.props.location.search.slice(1));
    return s.verbs ? s.verbs : "all";
  };

  state = {
    question: 0,
    correct: [],
    questions: [],
    dataError: null,
    loading: true
  };

  componentDidMount = async () => {
    try {
      const spanishRes = await axios.get(
        "https://s3-eu-west-1.amazonaws.com/conjugator-verb-data/spanish.dev.json"
      );
      const englishRes = await axios.get(
        "https://s3-eu-west-1.amazonaws.com/conjugator-verb-data/english.dev.json"
      );

      const questions = generateSet({
        english: englishRes.data,
        target: spanishRes.data,
        tenses: this.extractTenses(),
        length: this.extractQuestionLength(),
        verbType: this.extractVerbType()
      });
      this.setState({
        questions,
        loading: false
      });
    } catch (e) {
      if (e.response) {
        this.setState({
          dataError: "Sorry, something went wrong fetching verb data",
          loading: false
        });
      } else {
        throw e;
      }
    }
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
    const progress = this.state.questions.length
      ? Math.round((this.state.question / this.state.questions.length) * 100)
      : 0;
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
    if (this.state.loading) {
      return (
        <CenterDiv>
          <p>Loading...</p>
        </CenterDiv>
      );
    } else if (this.state.dataError) {
      return (
        <Container>
          <CenterDiv>
            <Error>{this.state.dataError}</Error>
          </CenterDiv>
        </Container>
      );
    } else {
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
  }

  static propTypes = {
    location: PropTypes.object.isRequired
  };
}

export default QuestionSet;
