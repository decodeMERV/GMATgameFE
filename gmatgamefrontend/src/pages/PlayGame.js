import React, {Component} from 'react';
import './PlayGame.css';
import DescriptiveTextBox from '../elements/DescriptiveTextBox';
import Question from '../elements/Question';
import Answer from '../elements/Answer';
import api from '../api';
import Timer from '../elements/Timer';
import auth from '../auth';
import Spinner from '../elements/Spinner.js';


export default class PlayGame extends Component {
  constructor(){
    super();
    this.state = {
      score : 0,
      Q     : "LOADING Question...",
      startTime: Date.now(),
      loading : true,
    }
  };

  fetchQAndA = (currentLevel, isCorrect) => {
    api.requestQuestion(currentLevel, isCorrect, auth.getToken())
      .then( res => {
        this.setState({
          ID: res.body.id,
          Q: res.body.title,
          A: res.body.answerA,
          B: res.body.answerB,
          C: res.body.answerC,
          D: res.body.answerD,
          E: res.body.answerE,
          correctAns: res.body.correctAnswer,
          cat : res.body.categoryId,
          cat_name : res.body.categoryName,
          level : res.body.level,
          isPlayerCorrect : undefined,
          startTime: Date.now(),
          timeElapsed: 0,
          loading: false
        })
      })
      .catch( error => {
        this.setState({
          Q: "Error loading Question: " + error
        })
      })
  }

  componentDidMount(){
    setTimeout( () => { return (this.fetchQAndA(200, false, auth.getToken()) )}, 750);
     //By default if we don't send the level param and the correct boolean and will start at the initial question
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
      var score = 100;
      var isCorrect = 1;


    }
    else if (this.state.correctAns !== answer && this.state.isPlayerCorrect === undefined) {
      this.setState({
        isPlayerCorrect : false,
        playerChoice: answer
      });
      score = 0;
      isCorrect = 0;

    }

    var username = this.props.username;
    var questionId = this.state.ID;
    var category = this.state.cat;
    var level = this.state.level;
    var time = this.state.timeElapsed;


      api.recordQuestion(username,questionId,isCorrect,category,answer,level,score,time, auth.getToken())
      .then(res => {console.log("res",res)})
      .catch(() => this.setState({theError: "Wrong database command"}))

  }

  colorChoices = (answersAtoE) => {
    if (answersAtoE === this.state.correctAns) {
      return "#d2f9d2";
    }
    else if (answersAtoE !== this.state.correctAns && answersAtoE === this.state.playerChoice){
      return "#f9a1a1";
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
    if (this.state.loading){
      return (
        <div className="loading-div">
          <Spinner />
        </div>
      )
    }
    return(
      <div>
        <div className="scoreboard-container">
          <Timer time={this.state.timeElapsed} />
          <DescriptiveTextBox bgColor="none" color="white" theText={"SCORE: " + this.state.score}/>
          <DescriptiveTextBox bgColor="none" color="white" theText={this.state.cat_name}/>
          <DescriptiveTextBox bgColor="none" color="white" theText={"Level: " + this.state.level}/>
        </div>
        <div className="game-container">
          <Question questionText={this.state.Q}/>
          <div className="next">
            { this.state.isPlayerCorrect !== undefined ?
              <DescriptiveTextBox theText="Next Question" bgColor="none" color="#444444" border="1px solid #b1bdcc" radius="4px" onClick={this.nextQuestionFetch}/>
              :
              null
            }
          </div>
          {/*The below ternaries are to check if the player has yet to click on the multiple choice options, if so we assign an onClick handler, if they have we begin to color them accordingly.*/}
          {['A','B','C','D','E'].map(ans =>
            <Answer answerText={this.state[ans]}
                    onClick={this.state.isPlayerCorrect === undefined ? () => this.calculateCorrectAns(ans) : null}
                    bgColor={this.state.isPlayerCorrect !== undefined ? this.colorChoices(ans) : null}
                    key={ans}/>
          )}






        </div>
      </div>
    )
  }
}
