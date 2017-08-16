import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';
import auth from './auth.js';
import DescriptiveTextBox from './elements/DescriptiveTextBox';

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount(){
    this.fetchUserProfile();
  }

  fetchUserProfile = () => {
    auth.getCurrentLoggedInUser(auth.getToken())
      .then( (res) => {
        this.setState({
          username : res.body.username,
          avatarUrl : res.body.avatarUrl,
        })
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-navbar">
          <Link to="/play" className="play-button">
            PLAY
          </Link>
          <Link to="/" className="App-navbar__title">
            GMAT Trainer
          </Link>
          <Link to="/dashboard">
            <img src={this.state.avatarUrl} style={{borderRadius:"50%", width:"2rem", backgroundColor:"black"}}/>
          </Link>
          {
            auth.isLoggedIn() ?
            <DescriptiveTextBox
              onClick={() => {
                auth.logout()
                  .then( () => {
                    this.setState({avatarUrl: undefined, username:undefined, isLoggedIn: false});
                    this.props.router.push('/');
                  })
              }}
              theText="LOGOUT"
            />
              :
            null
          }
        </div>
        {React.cloneElement(this.props.children, {logOutProp : this.state.isLoggedIn} )}

      </div>
    );
  }
}

export default App;
