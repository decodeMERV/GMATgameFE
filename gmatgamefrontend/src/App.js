import React, { Component } from 'react';
import DescriptiveTextBox from './elements/DescriptiveTextBox';
import ProfileBox from './elements/ProfileBox';
import Question from './elements/Question';

import './App.css';

const sampleText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur molestias, temporibus! A architecto atque autem eaque eligendi error, ex fuga ipsam nemo neque nesciunt odit officia praesentium, sit tempore vel! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur molestias, temporibus! A architecto atque autem eaque eligendi error, ex fuga ipsam nemo neque nesciunt odit officia praesentium, sit tempore vel!`;

class App extends Component {

  render() {
    return (
      <div className="App">
        <DescriptiveTextBox theText={"Score:\n250"} bgColor="babyblue" fontSize="2rem" color="black"/>
        <DescriptiveTextBox theText={"Score:\n250"} bgColor="yellow" fontSize="2rem" color="black"/>
        <DescriptiveTextBox theText={"Score:\n250"} bgColor="orange" fontSize="2rem" color="black"/>
        <br/>
        <Question questionText={sampleText} fontSize="1.25rem"/>
        <br/>
        <ProfileBox name="Athena, God of War" contact="Atlantis@underwater.com" aboutMe={sampleText}/>
      </div>
    );
  }
}

export default App;
