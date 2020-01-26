import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ReactSelect from "react-select";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Input from "./Reusable/Input";
import Error from "./Reusable/Error";

const FlexDiv = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-around;
  max-width: 500px;
  margin: auto;
`;

const Select = styled.select`
  width: 250px;
  font-size: 1.2rem;
  border: 1px solid #63b5b0;
`;

const Label = styled.label`
  font-weight: 800;
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
    { type: "irregular", meta: ["Randomly selected irregular verbs"] },
    {
      type: "specific",
      meta: ["Choose which verbs you want to study from the list below"]
    }
  ];

  state = {
    numOfQuestions: 30,
    tenses: {
      present: true,
      future: true,
      imperfect: true,
      preterite: true,
      conditional: true
    },
    pronouns: {
      I: true,
      you: true,
      "he/she/it": true,
      "you(pl)": true,
      we: true,
      they: true
    },
    chosenVerbType: "all",
    language: "Spanish",
    tensesError: null,
    numOfQuestionsError: null,
    pronounsError: null,
    verbList: [],
    verbsError: null,
    verbsChosen: []
  };

  componentDidMount() {
    this.fetchVerbList(this.state.language);
  }

  fetchVerbList = async () => {
    try {
      const resp = await axios.get(
        `${process.env.API_ENDPOINT}/infinitives?language=spanish`
      );
      const verbList = resp.data.map(v => ({ value: v, label: v }));
      this.setState({
        verbList,
        verbsError: null
      });
    } catch (e) {
      this.setState({
        verbList: [],
        verbsError: "Could not fetch verbs"
      });
    }
  };

  generateLink = () => {
    let l = `/languages/${this.state.language.toLowerCase()}?`;
    l += `verbs=${this.state.chosenVerbType}&`;
    l += `questions=${this.state.numOfQuestions}`;

    const tenses = [];
    Object.keys(this.state.tenses).forEach(t => {
      if (this.state.tenses[t]) {
        tenses.push(t);
      }
    });
    l += `&tenses=${tenses.join(",")}`;

    const pronouns = [];
    Object.keys(this.state.pronouns).forEach(p => {
      if (this.state.pronouns[p]) {
        pronouns.push(p);
      }
    });
    l += `&pronouns=${pronouns.join(",")}`;

    const selectedVerbs = this.state.verbsChosen.map(v => v.value);
    l += `&selectedVerbs=${selectedVerbs.join(",")}`;

    return l;
  };

  toggleCheckedTense = e => {
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

  toggleCheckedPronoun = e => {
    const newPronouns = Object.assign({}, this.state.pronouns, {
      [e.target.name]: !this.state.pronouns[e.target.name]
    });
    const vals = Object.values(newPronouns);
    let pronounsError = null;
    if (vals.every(v => !v)) {
      pronounsError = "Select at least 1 pronoun to practice";
    }
    this.setState({
      pronouns: newPronouns,
      pronounsError
    });
  };

  handleQuestionChange = e => {
    const numOfQuestions = e.target.value;
    let err = null;
    if (Number(numOfQuestions) < 1) {
      err = "Must select at least 1 question";
    } else if (Number(numOfQuestions) > 300) {
      err = "Maximum number of questions is 300";
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

  handleSpecificVerbChange = e => {
    this.setState({
      verbsChosen: e
    });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {/* Select a language */}
          <div className="row">
            <div className="col-4">
              <Label htmlFor="selectLang">Select a language:</Label>
            </div>
            <div className="col-8">
              <Select
                id="selectLang"
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
            <div className="col-4">
              <Label>Select tenses to practice:</Label>
            </div>
            <div className="col-8">
              <FlexDiv>
                {Object.keys(this.state.tenses).map(t => (
                  <div key={t}>
                    <input
                      onChange={this.toggleCheckedTense}
                      type="checkBox"
                      name={t}
                      id={`${t}TenseCheck`}
                      checked={this.state.tenses[t]}
                    />
                    <Label htmlFor={`${t}TenseCheck`}>{t}</Label>
                  </div>
                ))}
              </FlexDiv>
              <Error>{this.state.tensesError}</Error>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <Label>Select pronouns to practice:</Label>
            </div>
            <div className="col-8">
              <FlexDiv>
                {Object.keys(this.state.pronouns).map(p => (
                  <div key={p}>
                    <input
                      onChange={this.toggleCheckedPronoun}
                      type="checkBox"
                      name={p}
                      id={`${p}TenseCheck`}
                      checked={this.state.pronouns[p]}
                    />
                    <Label htmlFor={`${p}TenseCheck`}>{p}</Label>
                  </div>
                ))}
              </FlexDiv>
              <Error>{this.state.pronounsError}</Error>
            </div>
          </div>

          {/* Select Irregular/Common/All */}
          <div className="row">
            <div className="col-4">
              <Label>What verbs do you want to study?</Label>
            </div>
            <div className="col-8">
              {Home.verbTypes.map(t => (
                <div key={t.type}>
                  <input
                    onChange={this.changeVerbType}
                    type="radio"
                    name={t.type}
                    id={`${t.type}VerbSelection`}
                    checked={this.state.chosenVerbType === t.type}
                  />
                  <Label htmlFor={`${t.type}VerbSelection`}>{t.type}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Search for specific verbs */}
          <div className="row">
            <div className="col-4"></div>
            <div className="col-8">
              <ReactSelect
                className="infinitive-select"
                isDisabled={this.state.chosenVerbType !== "specific"}
                isMulti={true}
                isSearchable={true}
                value={this.state.verbsChosen}
                onChange={this.handleSpecificVerbChange}
                options={this.state.verbList}
                placeholder="Search for verbs"
                noOptionsMessage={() =>
                  this.state.verbsError ? "Could not load verbs" : "No options"
                }
              />
            </div>
          </div>

          {/* How many questions? */}
          <div className="row">
            <div className="col-4">
              <Label htmlFor="questionQuantity">How many questions?</Label>
            </div>
            <div className="col-8">
              <Input
                id="questionQuantity"
                onChange={this.handleQuestionChange}
                type="number"
                value={this.state.numOfQuestions}
              />
              <Error>{this.state.numOfQuestionsError}</Error>
            </div>
          </div>

          <div className="row">
            <div className="col-4" />
            <div className="col-8">
              <Button
                type="submit"
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
