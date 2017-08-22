import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';
import Menu from './modals/Menu';
import auth from './auth.js';
import onClickOutside from 'react-onclickoutside';

const Burger = onClickOutside(class extends Component {
  handleClickOutside() {
    this.props.onClickOutside();
  }
  render() {
    return (
      <i className="fa fa-bars fa-2x menu-icon"
         onClick={this.props.onClick}/>
    )
  }
})

class App extends Component {
  constructor() {
    super();
    this.state = {
      avatarUrl: "",
      isMenuOpen: false
    }
  }

  closeMenu = () => this.setState({ isMenuOpen: false })

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
    let {isMenuOpen} = this.state

    return (
      <div className="App">

        <div className="App-navbar">

          <Burger
            onClick={()=>this.setState({ isMenuOpen: !isMenuOpen })}
            onClickOutside={() => this.setState({isMenuOpen: false})}
            outsideClickIgnoreClass="menu__item"
          />
          <Menu show={isMenuOpen} onNavigate={() => this.setState({isMenuOpen: false})} />

          <Link to="/" className="App-navbar__title">

            <div className="gmatimage">
              <img src={require("./gmax_logo_v2.svg")} width="160px" height="100px"/>
            </div>
          </Link>

          {
            auth.isLoggedIn() ?
                <div className="gravatarIcon">
                  <Link to="/dashboard">
                    <img src={this.state.avatarUrl} alt="gravatarIcon" style={{borderRadius:"50%", maxWidth:"3rem", backgroundColor:"#2b2b2b"}}/>
                  </Link>
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
