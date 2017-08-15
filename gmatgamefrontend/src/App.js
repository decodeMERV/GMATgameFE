import React, { Component } from 'react';
import DescriptiveTextBox from './elements/DescriptiveTextBox';
import ProfileBox from './elements/ProfileBox';
import Question from './elements/Question';
import Answer from './elements/Answer';
import SignUp from './pages/SignUp';

import './App.css';
import LoginHomePage from "./pages/LoginHomePage";

const sampleText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur molestias, temporibus! A architecto atque autem eaque eligendi error, ex fuga ipsam nemo neque nesciunt odit officia praesentium, sit tempore vel! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur molestias, temporibus! A architecto atque autem eaque eligendi error, ex fuga ipsam nemo neque nesciunt odit officia praesentium, sit tempore vel!`;
const sampleText2 = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur molestias, temporibus!`;
class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="scoreBoard">
        <DescriptiveTextBox theText={"Score: 250"} bgColor="babyblue" fontSize="1.5rem" color="black"/>
        <DescriptiveTextBox theText={"Score: 250"} bgColor="yellow" fontSize="1.5rem" color="black"/>
        <DescriptiveTextBox theText={"Score: 250"} bgColor="beige" fontSize="1.5rem" color="black"/>
        </div>
        <br/>
        <Question questionText={'QUESTION '+sampleText} fontSize="1.25rem"/>
        <Answer answerText={'Answer '+sampleText2} fontSize="0.9rem"/>
        <Answer answerText={'Answer '+sampleText2} fontSize="0.9rem"/>
        <Answer answerText={'Answer '+sampleText2} fontSize="0.9rem"/>
        <Answer answerText={'Answer '+sampleText2} fontSize="0.9rem"/>
        <Answer answerText={'Answer '+sampleText2} fontSize="0.9rem"/>
        <br/>
        <ProfileBox name="Athena, God of War" contact="Atlantis@underwater.com" aboutMe={sampleText}/>
        <br/>
        <LoginHomePage />
        <br/>
        <SignUp />
      </div>
    );
  }
}

export default App;
