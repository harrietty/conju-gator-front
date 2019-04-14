import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "./Reusable/Button";
import Input from "./Reusable/Input";
import Error from "./Reusable/Error";

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
  static verbTypes = [
    { type: "all", meta: ["Randomly selected from over 250 available verbs"] },
    {
      type: "common",
      meta: [
        "25 common verbs including ser, estar, tener, seguir, decir, venir, hacer, ir, poder"
      ]
    },
    { type: "irregular", meta: ["Randomly selected irregular verbs"] }
  ];

  state = {
    numOfQuestions: 30,
    tenses: {
      present: true,
      future: true,
      perfect: true,
      preterite: true,
      conditional: true
    },
    chosenVerbType: "all",
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

  changeVerbType = e => {
    this.setState({
      chosenVerbType: e.target.name
    });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {/* Select a language */}
          <div className="row">
            <div className="col-3">
              <label>Select a language:</label>
            </div>
            <div className="col-9">
              <Select
                onChange={this.changeLanguage}
                value={this.state.language}
              >
                {["Spanish", "More languages coming soon!"].map(l => (
                  <option key={l} value={l} disabled={l !== "Spanish"}>
                    {l}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Selec Tenses */}
          <div className="row">
            <div className="col-3">
              <label>Select tenses to practice:</label>
            </div>
            <div className="col-9">
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
            </div>
          </div>

          {/* Select Irregular/Common/All */}
          <div className="row">
            <div className="col-3">
              <label>What verbs do you want to study?</label>
            </div>
            <div className="col-9">
              {Home.verbTypes.map(t => (
                <div key={t.type}>
                  <input
                    onChange={this.changeVerbType}
                    type="radio"
                    name={t.type}
                    id={`${t.type}VerbSelection`}
                    checked={this.state.chosenVerbType === t.type}
                  />
                  <label htmlFor={`${t.type}VerbSelection`}>{t.type}</label>
                </div>
              ))}
            </div>
          </div>

          {/* How many questions? */}
          <div className="row">
            <div className="col-3">
              <label>How many questions?</label>
            </div>
            <div className="col-9">
              <Input
                onChange={this.handleQuestionChange}
                type="number"
                value={this.state.numOfQuestions}
              />
              <Error>{this.state.numOfQuestionsError}</Error>
            </div>
          </div>

          <div className="row">
            <div className="col-3" />
            <div className="col-9">
              <Button
                disabled={
                  !!(this.state.tensesError || this.state.numOfQuestionsError)
                }
              >
                Start
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  };
}

export default Home;
