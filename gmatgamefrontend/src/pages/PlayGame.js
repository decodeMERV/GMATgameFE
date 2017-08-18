import React, {Component} from 'react';
import './PlayGame.css';
import DescriptiveTextBox from '../elements/DescriptiveTextBox';
import Question from '../elements/Question';
import Answer from '../elements/Answer';
import api from '../api';
import Timer from '../elements/Timer';

export default class PlayGame extends Component {
  constructor(){
    super();
    this.state = {
      score : 0,
      Q     : "LOADING Question...",
      startTime: Date.now()
    }
  };

  fetchQAndA = (currentLevel, isCorrect) => {
    api.requestQuestion(currentLevel, isCorrect)
      .then( res => {
        this.setState({
          Q: res.body.title,
          A: res.body.answerA,
          B: res.body.answerB,
          C: res.body.answerC,
          D: res.body.answerD,
          E: res.body.answerE,
          correctAns: res.body.correctAnswer,
          cat : res.body.category,
          level : res.body.level,
          isPlayerCorrect : undefined,
          startTime: Date.now(),
          timeElapsed: 0
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
    this.timer = setInterval(() => {
      if (this.state.isPlayerCorrect === undefined) {
        this.setState({
          timeElapsed: Date.now() - this.state.startTime
        })
      }
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  calculateCorrectAns = (answer) => {
    if (this.state.correctAns === answer && this.state.isPlayerCorrect === undefined){
      this.setState({
        isPlayerCorrect : true,
        playerChoice : answer,
        score : this.state.score + 100
      });
    }
    else if (this.state.correctAns !== answer && this.state.isPlayerCorrect === undefined) {
      this.setState({
        isPlayerCorrect : false,
        playerChoice: answer
      });
    }
  }

  colorChoices = (answersAtoE) => {
    if (answersAtoE === this.state.correctAns) {
      return "green";
    }
    else if (answersAtoE !== this.state.correctAns && answersAtoE === this.state.playerChoice){
      return "red";
    }
  }

  nextQuestionFetch = () => {
    if (this.state.isPlayerCorrect){
      this.fetchQAndA(this.state.level, this.state.isPlayerCorrect);
    }
    else {
      this.fetchQAndA(this.state.level, this.state.isPlayerCorrect);
    }
  }

  render(){
    return(
      <div>
        <div className="timer-container">
          <Timer time={this.state.timeElapsed} />
        </div>
        <div className="description-container">
          <DescriptiveTextBox bgColor="#25a521" color="white" theText={"SCORE: " + this.state.score}/>
          <DescriptiveTextBox bgColor="#0790f7" color="white" theText={"Category: " + this.state.cat}/>
          <DescriptiveTextBox bgColor="#f03b3b" color="white" theText={"Level: " + this.state.level}/>
        </div>
        <div className="game-container">
          <Question questionText={this.state.Q}/>
          {/*The below ternaries are to check if the player has yet to click on the multiple choice options, if so we assign an onClick handler, if they have we begin to color them accordingly.*/}
          {['A','B','C','D','E'].map(ans =>
            <Answer answerText={this.state[ans]} onClick={this.state.isPlayerCorrect === undefined ? () => this.calculateCorrectAns(ans) : null} bgColor={this.state.isPlayerCorrect !== undefined ? this.colorChoices(ans) : null} key={ans}/>
          )}
          <div className="next">
          { this.state.isPlayerCorrect !== undefined ?
            <DescriptiveTextBox theText="NEXT QUESTION" onClick={this.nextQuestionFetch}/>
            :
            null
          }
          </div>
        </div>
      </div>
    )
  }
}
