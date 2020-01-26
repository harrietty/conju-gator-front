import { parse } from "querystring";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";
import { Progress } from "react-sweet-progress";
import * as colors from "./style/colors";
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
    return this.params.tenses ? this.params.tenses.split(",") : [];
  };

  extractPronouns = () => {
    return this.params.tenses ? this.params.pronouns.split(",") : [];
  };

  extractQuestionLength = () => {
    return this.params.questions ? Number(this.params.questions) : 30;
  };

  extractVerbType = () => {
    let v = "all";
    if (this.params.verbs && this.params.verbs !== "specific") {
      v = this.params.verbs;
    }
    return v;
  };

  extractSelectedVerbs = () => {
    return this.params.selectedVerbs
      ? this.params.selectedVerbs.split(",")
      : null;
  };

  componentWillMount() {
    this.params = parse(this.props.location.search.slice(1));
  }

  state = {
    question: 0,
    correct: [],
    incorrect: [],
    questions: [],
    dataError: null,
    loading: true
  };

  componentDidMount = async () => {
    const selectedVerbs = this.extractSelectedVerbs();
    let spanishFetchUrl = `${process.env.API_ENDPOINT}/conjugations?language=spanish`;
    const englishFetchUrl = `${process.env.API_ENDPOINT}/conjugations?language=english`;

    if (selectedVerbs) {
      // update URLs to only get the selected verbs
      spanishFetchUrl += `&verbs=${this.params.selectedVerbs}`;
    }

    try {
      const spanishRes = await axios.get(spanishFetchUrl);
      const englishRes = await axios.get(englishFetchUrl);

      const questions = generateSet({
        english: englishRes.data,
        target: spanishRes.data,
        tenses: this.extractTenses(),
        pronouns: this.extractPronouns(),
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
    const questionAnswered = this.state.questions[this.state.question];
    const newCorrect = this.state.correct.slice();
    const newIncorrect = this.state.incorrect.slice();
    if (response.toLowerCase() === questionAnswered.correct) {
      newCorrect.push({
        question: questionAnswered.original,
        answer: response
      });
    } else {
      newIncorrect.push({
        question: questionAnswered.original,
        answer: response
      });
    }

    this.setState({
      question: this.state.question + 1,
      correct: newCorrect,
      incorrect: newIncorrect
    });
  };

  render() {
    const progress = this.state.questions.length
      ? Math.round((this.state.question / this.state.questions.length) * 100)
      : 0;
    const progressTheme = {
      success: {
        color: colors.green,
        symbol: progress + "%"
      },
      active: {
        color: colors.green,
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
            <React.Fragment>
              <FinalScreen
                correct={this.state.correct}
                incorrect={this.state.incorrect}
                total={this.state.questions.length}
              />
            </React.Fragment>
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
