import React, {Component} from 'react';
import './AdminDashboard.css';
import DescriptiveTextBox from '../elements/DescriptiveTextBox';
import api from '../api';
import auth from '../auth';

const ENTER = 13;

export default class AdminDashboard extends Component {
  constructor(){
    super();
    this.state={
      error : null,
      successMSG: null
    }
  }

  handleUserInput = (e) => {
    if (this.state && this.state.error) {
      this.setState({ error: null })
    }
    if (this.state && this.state.successMSG) {
      this.setState({ successMSG: null })
    }
    if (e.keyCode===ENTER) {
      this.processCreateQuestion()
    }
  }

  processCreateQuestion = () => {
    var questionObj = {};

    for (var ref in this.refs){
      questionObj[ref] = (this.refs[ref].value);
      if (!this.refs[ref].value) { //Check if form is empty
        this.setState({error: "Fill in the form!"})
        return;
      }
    }

    api.createQuestion(questionObj, auth.getToken())
      .then( (res) => {
        this.setState({successMSG: res.body.message})
      })
      .catch( (error) => {
        console.log("error posting to questions table", error);
        this.setState({error: "Error posting to questions table" + error})
      })
  }

  render () {
    console.log(this.state);
    return (
      <div>
        {(this.state.successMSG !== null) ?
          <DescriptiveTextBox theText={this.state.successMSG} bgColor="green"/>
          :
          null}
        {(this.state.error !== null) ?
          <DescriptiveTextBox theText={this.state.error} bgColor="red"/>
          :
          null}
        <input ref="title" type="text" onKeyUp={this.handleUserInput} placeholder={"Question"}/>
        {['A', 'B', 'C', 'D', 'E'].map( (letter) => {
          return <input type="text" onKeyUp={this.handleUserInput} placeholder={"Answer" + letter} ref={"answer"+letter} key={letter}/>
        })}
        <select ref="correctAnswer" onChange={this.handleUserInput}>
          {['A', 'B', 'C', 'D', 'E'].map( (letter) => {
            return <option value={letter} key={letter}>{"Answer " + letter}</option>
          })}
        </select>
        <select ref="level" onChange={this.handleUserInput}>
          {['200', '300', '400'].map( (level) => {
            return <option value={level} key={level}>{"level " + level}</option>
          })}
        </select>
        <select ref="categoryId" onChange={this.handleUserInput}>
          {['Math', 'Verbal', 'Writing', 'Reasoning', 'Data'].map( (category, index) => {
            return <option value={index + 1} key={category}>{category}</option>
          })}
        </select>
        <DescriptiveTextBox theText="Create" onClick={this.processCreateQuestion}/>
      </div>
    );
  }
}