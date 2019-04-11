import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "./Reusable/Button";
import Input from "./Reusable/Input";
import Error from "./Reusable/Error";

const P = styled.p`
  text-align: center;
  font-size: 1.5rem;
`;

const CenterDiv = styled.div`
  text-align: center;
`;

const FlexDiv = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-around;
  max-width: 500px;
  margin: auto;
  margin-top: 20px;
`;

const Select = styled.select`
  width: 250px;
  font-size: 1.2rem;
  border: 1px solid #63b5b0;
`;

class Home extends React.Component {
  state = {
    numOfQuestions: 30,
    tenses: {
      present: true,
      future: true,
      perfect: true,
      preterite: true,
      conditional: true
    },
    language: "Spanish",
    tensesError: null,
    numOfQuestionsError: null
  };

  generateLink = () => {
    let l = `/${this.state.language.toLowerCase()}?`;
    l += `questions=${this.state.numOfQuestions}&tenses=`;
    const tenses = [];
    Object.keys(this.state.tenses).forEach(t => {
      if (this.state.tenses[t]) {
        tenses.push(t);
      }
    });
    l += tenses.join(",");
    return l;
  };

  toggleChecked = e => {
    const newTenses = Object.assign({}, this.state.tenses, {
      [e.target.name]: !this.state.tenses[e.target.name]
    });
    const vals = Object.values(newTenses);
    let tensesError = null;
    if (vals.every(v => !v)) {
      tensesError = "Select at least 1 tense to practice";
    }
    this.setState({
      tenses: newTenses,
      tensesError
    });
  };

  handleQuestionChange = e => {
    const numOfQuestions = e.target.value;
    let err = null;
    if (Number(numOfQuestions) < 1) {
      err = "Must select at least 1 question";
    }
    this.setState({
      numOfQuestions: numOfQuestions,
      numOfQuestionsError: err
    });
  };

  changeLanguage = e => {
    this.setState({
      language: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const l = this.generateLink();
    this.props.history.push(l);
  };

  render() {
    return (
      <CenterDiv>
        <form onSubmit={this.handleSubmit}>
          <P>Select a language:</P>
          <Select onChange={this.changeLanguage} value={this.state.language}>
            {["Spanish", "More languages coming soon!"].map(l => (
              <option key={l} value={l} disabled={l !== "Spanish"}>
                {l}
              </option>
            ))}
          </Select>
          <P>Select tenses to practice:</P>
          <FlexDiv>
            {Object.keys(this.state.tenses).map(t => (
              <div key={t}>
                <input
                  onChange={this.toggleChecked}
                  type="checkBox"
                  name={t}
                  id={`${t}TenseCheck`}
                  checked={this.state.tenses[t]}
                />
                <label htmlFor={`${t}TenseCheck`}>{t}</label>
              </div>
            ))}
          </FlexDiv>
          <Error>{this.state.tensesError}</Error>
          <P>How many questions?</P>
          <FlexDiv>
            <Input
              onChange={this.handleQuestionChange}
              type="number"
              value={this.state.numOfQuestions}
            />
          </FlexDiv>
          <Error>{this.state.numOfQuestionsError}</Error>
          <FlexDiv>
            <Button
              disabled={
                !!(this.state.tensesError || this.state.numOfQuestionsError)
              }
            >
              Start
            </Button>
          </FlexDiv>
        </form>
      </CenterDiv>
    );
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  };
}

export default Home;
