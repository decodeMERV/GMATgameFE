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
          A1: res.body.answerA,
          A2: res.body.answerB,
          A3: res.body.answerC,
          A4: res.body.answerD,
          A5: res.body.answerE,
          correctAns: res.body.correctAnswer,
          cat : res.body.category,
          level : res.body.level
        })
      })
      .catch(console.log)
  }

  componentDidMount(){
    this.fetchQAndA(200, true);
  }

  componentDidUpdate(prevProps, prevState){
    this.fetchQAndA();
  }

  render(){
    return(
      <div>
        <div className="description-container">
          <DescriptiveTextBox bgColor="olive" color="white" theText={"SCORE:" + this.state.score}/>
          <DescriptiveTextBox bgColor="babyblue" color="white" theText={this.state.cat}/>
          <DescriptiveTextBox bgColor="lightred" color="white" theText={this.state.level}/>
        </div>
        <div className="game-container">
          <Question questionText={this.state.Q}/>
          <Answer answerText={this.state.A1}/>
          <Answer answerText={this.state.A2}/>
          <Answer answerText={this.state.A3}/>
          <Answer answerText={this.state.A4}/>
          <Answer answerText={this.state.A5}/>
        </div>
      </div>
    )
  }
}