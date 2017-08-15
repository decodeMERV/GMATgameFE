import React, {Component} from 'react';
import './PlayGame.css';
import DescriptiveTextBox from '../elements/DescriptiveTextBox';
import Question from '../elements/Question';
import Answer from '../elements/Answer';
import api from '../api';

export default class PlayGame extends Component {
  constructor(){
    super();
    this.state = {
      score : 0
    }
  };

  fetchQAndA = (currentLevel, isCorrect) => {
    api.requestQuestion(currentLevel, isCorrect)
      .then( res => {
        this.setState({
          Q : res.body.title,
          A: res.body.answerA,
          B: res.body.answerB,
          C: res.body.answerC,
          D: res.body.answerD,
          E: res.body.answerE,
          correctAns: res.body.correctAnswer,
          cat : res.body.category,
          level : res.body.level
        })
      })
      .catch( error => {
        this.setState({
          Q: "Error loading Question: " + error
        })
      })
  }

  componentDidMount(){
    this.fetchQAndA(); //By default if we don't send the level param and the correct boolean and will start at the initial question
  }

  calculateCorrectAns = (answer) => {
    if (this.state.correctAns === answer){
      console.log("CORRECT!");
    }
  }

  componentDidUpdate(){
    
  }

  render(){
    return(
      <div>
        <div className="description-container">
          <DescriptiveTextBox bgColor="olive" color="white" theText={"SCORE: " + this.state.score}/>
          <DescriptiveTextBox bgColor="blue" color="white" theText={"Category: " + this.state.cat}/>
          <DescriptiveTextBox bgColor="red" color="white" theText={this.state.level}/>
        </div>
        <div className="game-container">
          <Question questionText={this.state.Q}/>
          {
            ['A','B','C','D','E'].map(ans => <Answer answerText={this.state[ans]} onClick={() => this.calculateCorrectAns(ans)} />)
          }
        </div>
      </div>
    )
  }
}