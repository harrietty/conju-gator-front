import { parse } from "querystring";
import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import axios from "axios";
import { Progress } from "react-sweet-progress";
import * as colors from "./style/colors";
import config from "./configuration";
import "react-sweet-progress/lib/style.css";
import { LanguageData } from "./data/helpers";

import Question from "./Question";
import FinalScreen from "./FinalScreen";
import Error from "./Reusable/Error";

const envConfig = config[process.env.NODE_ENV];

const Container = styled.div`
  margin-top: 50px;
`;

const ProgressContainer = styled.div`
  padding: 0 3%;
`;

const CenterDiv = styled.div`
  text-align: center;
`;

const QuestionSet = ({ location }) => {
  const [loading, setLoading] = useState(true);
  const [langData, setLangData] = useState(null);
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [completedQuestionsNum, setCompletedQuestionsNum] = useState(0);
  const [
    hasFinishedInfiniteQuestionSet,
    setHasFinishedInfiniteQuestionSet
  ] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(Infinity);
  const [dataError, setDataError] = useState(null);

  const params = useMemo(() => {
    return parse(location.search.slice(1));
  }, [location]);

  useEffect(() => {
    const selectedVerbs = extractSelectedVerbs();
    let spanishFetchUrl = `${envConfig.API_ENDPOINT}/conjugations?language=spanish`;
    const englishFetchUrl = `${envConfig.API_ENDPOINT}/conjugations?language=english`;

    if (selectedVerbs) {
      // update URLs to only get the selected verbs
      spanishFetchUrl += `&verbs=${params.selectedVerbs}`;
    }

    fetchVerbs(spanishFetchUrl, englishFetchUrl);
  }, [params]);

  const extractTenses = () => {
    return params.tenses ? params.tenses.split(",") : [];
  };

  const extractPronouns = () => {
    return params.tenses ? params.pronouns.split(",") : [];
  };

  const extractQuestionLength = () => {
    return params.questions
      ? params.questions === "infinite"
        ? Infinity
        : Number(params.questions)
      : 30;
  };

  const extractVerbType = () => {
    let v = "all";
    if (params.verbs && params.verbs !== "specific") {
      v = params.verbs;
    }
    return v;
  };

  const extractSelectedVerbs = () => {
    return params.selectedVerbs ? params.selectedVerbs.split(",") : null;
  };

  const fetchVerbs = async (spanishFetchUrl, englishFetchUrl) => {
    try {
      const questionLength = extractQuestionLength();
      setTotalQuestions(questionLength);

      const spanishRes = await axios.get(spanishFetchUrl);
      const englishRes = await axios.get(englishFetchUrl);

      const langData = new LanguageData({
        english: englishRes.data,
        target: spanishRes.data,
        tenses: extractTenses(),
        pronouns: extractPronouns(),
        length: questionLength,
        verbType: extractVerbType()
      });
      setLangData(langData);
      setCurrentQuestion(langData.getNextQuestion());
    } catch (e) {
      if (e.response) {
        setDataError("Sorry, something went wrong fetching verb data");
      } else {
        throw e;
      }
    }
    setLoading(false);
  };

  const handleQuestionSubmit = response => {
    if (response.toLowerCase() === currentQuestion.correct) {
      setCorrect([
        ...correct,
        {
          question: currentQuestion.original,
          answer: response
        }
      ]);
      setCompletedQuestionsNum(completedQuestionsNum + 1);
      setCurrentQuestion(langData.getNextQuestion());
    } else {
      setIncorrect([
        ...incorrect,
        {
          question: currentQuestion.original,
          answer: response
        }
      ]);
      setCompletedQuestionsNum(completedQuestionsNum + 1);

      if (totalQuestions === Infinity) {
        setHasFinishedInfiniteQuestionSet(true);
      }
    }
  };

  const progress =
    totalQuestions === Infinity
      ? null
      : totalQuestions
      ? Math.round((completedQuestionsNum / totalQuestions) * 100)
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

  if (loading) {
    return (
      <CenterDiv>
        <p>Loading...</p>
      </CenterDiv>
    );
  } else if (dataError) {
    return (
      <Container>
        <CenterDiv>
          <Error>{dataError}</Error>
        </CenterDiv>
      </Container>
    );
  } else {
    return (
      <Container>
        {progress !== null ? (
          <ProgressContainer>
            <Progress percent={progress} theme={progressTheme} />
          </ProgressContainer>
        ) : hasFinishedInfiniteQuestionSet ? null : (
          <p>Streak number</p>
        )}
        {completedQuestionsNum === totalQuestions ||
        hasFinishedInfiniteQuestionSet ? (
          <React.Fragment>
            <FinalScreen
              correct={correct}
              incorrect={incorrect}
              total={totalQuestions}
              streakMode={totalQuestions === Infinity}
            />
          </React.Fragment>
        ) : (
          <Question
            {...currentQuestion}
            handleQuestionSubmit={handleQuestionSubmit}
          />
        )}
      </Container>
    );
  }
};

export default QuestionSet;
