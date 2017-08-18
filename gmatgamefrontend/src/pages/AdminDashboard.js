import React, {Component} from 'react';
import './AdminDashboard.css';
import DescriptiveTextBox from '../elements/DescriptiveTextBox';
import api from '../api';
import auth from '../auth';

const ENTER = 13;

export default class AdminDashboard extends Component {

  _handleTyping = (e) => {
    if (this.state && this.state.error) {
      this.setState({ error: null })
    }
    if (e.keyCode===ENTER) {
      this._handleLogin()
    }
  }

  processCreateQuestion = () => {
    var questionObj = {};
    for (var ref in this.refs){
      questionObj[ref] = (this.refs[ref].value);
    }
    console.log(questionObj);
    api.createQuestion(questionObj, auth.getToken())
      .catch( (error) => console.log("error posting to questions table", error))
  }

  render () {
    return (
      <div>
        <input ref="title" type="text" onKeyUp={this._handleTyping} placeholder={"Question"}/>
        {['A', 'B', 'C', 'D', 'E'].map( (letter) => {
          return <input type="text" onKeyUp={this._handleTyping} placeholder={"Answer" + letter} ref={"answer"+letter} key={letter}/>
        })}
        <select ref="correctAnswer">
          {['A', 'B', 'C', 'D', 'E'].map( (letter) => {
            return <option value={letter} key={letter}>{"Answer " + letter}</option>
          })}
        </select>
        <select ref="level">
          {['200', '300', '400'].map( (level) => {
            return <option value={level} key={level}>{"level " + level}</option>
          })}
        </select>
        <select ref="categoryId">
          {['Math', 'Verbal', 'Writing', 'Reasoning', 'Data'].map( (category, index) => {
            return <option value={index + 1} key={category}>{category}</option>
          })}
        </select>
        <DescriptiveTextBox theText="Create" onClick={this.processCreateQuestion}/>
      </div>
    );
  }
}