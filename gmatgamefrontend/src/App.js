import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';
import auth from './auth.js';
import Menu from './elements/Menu.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      avatarUrl: "",
    }
  }

  componentDidMount(){
    if (this.props.loggedIn){
      this.fetchUserProfile();
    }
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

  componentWillReceiveProps(newProps) {
    if (newProps.loggedIn !== this.props.loggedIn) {
      if (newProps.loggedIn) {
        this.fetchUserProfile();
      }
      else {
        this.setState({ avatarUrl: "" });
      }
    }
  }

  render() {
    return (
      <div className="App">

        <div className="App-navbar">

          <Link to="/" className="App-navbar__title">
          </Link>

          <i className="fa fa-bars fa-2x menu-icon" />
          <div>
            <img src={require("./gmat_logo.svg")} alt="logo" style={{width: 200, height: 50, marginLeft: 10 }} />
          </div>

          {
            auth.isLoggedIn() ?
                <div className="gravatarIcon">
                  <Link to="/dashboard">
                    <img src={this.state.avatarUrl} alt="gravatarIcon" style={{borderRadius:"50%", maxWidth:"3rem", backgroundColor:"black"}}/>
                      </Link>
                    <div>
                        <p className="p-nav"
                          onClick={() => {
                              auth.logout()
                              .then( () => {
                                this.setState({avatarUrl: "", username:undefined});
                                this.props.router.push('/');
                              })
                            }}
                            >
                            logout</p>
                      </div>
                    {/*<p>{this.state.username}</p>*/}
                </div>
            :
            null
        }
        </div>
        <div className="background-overlay">
        {React.cloneElement(this.props.children, {loggedInProp :this.props.loggedIn, username : this.state.username } )}
      </div>
      </div>
    );
  }
}

export default App;
