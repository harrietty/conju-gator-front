import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./Reusable/Button";

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

const Input = styled.input`
  height: 37px;
  font-size: 1rem;
  width: 100px;
  border: 1px solid #63b5b0;
  border-radius: 3px;
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
    language: "Spanish"
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
    this.setState({
      tenses: Object.assign({}, this.state.tenses, {
        [e.target.name]: !this.state.tenses[e.target.name]
      })
    });
  };

  handleQuestionChange = e => {
    this.setState({
      numOfQuestions: e.target.value
    });
  };

  changeLanguage = e => {
    this.setState({
      language: e.target.value
    });
  };

  render() {
    return (
      <div>
        <P>Select a language:</P>
        <CenterDiv>
          <Select onChange={this.changeLanguage} value={this.state.language}>
            {["Spanish", "French", "Portuguese", "Norwegian"].map(l => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>
        </CenterDiv>
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
        <P>How many questions?</P>
        <FlexDiv>
          <Input
            onChange={this.handleQuestionChange}
            type="number"
            value={this.state.numOfQuestions}
          />
        </FlexDiv>
        <FlexDiv>
          <Link to={this.generateLink()}>
            <Button>Start</Button>
          </Link>
        </FlexDiv>
      </div>
    );
  }
}

export default Home;
