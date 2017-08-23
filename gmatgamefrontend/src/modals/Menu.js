import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import onClickOutside from 'react-onclickoutside';
import auth from '../auth';
import './Menu.css';

class Menu extends Component {

  constructor(props){
    super(props);
    this.state = {
      isUserLoggedIn : false,
    };
  }

  componentDidMount(){
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.isUserLoggedIn !== prevState.isUserLoggedIn) {
      this.setState({ url: ""})
    }

  }

  _handleLogout = () =>{


    auth.logout()
    .then((res => this.props.router.push('/')))
    .catch( error => alert("Could not log you out, " + error) )
}

  changeLoggedIn = () => { this.setState({isUserLoggedIn : !this.state.isUserLoggedIn}) }

  handleClickOutside = () => {}

  render() {

    let { show } = this.props
    const isLoggedIn = auth.isLoggedIn()


    return (

      <div className={`menu ${show?"show":""}`} onClick={console.log}>

        <div className="menu__list">

          {!isLoggedIn ?
            <Link to="/" className="menu__item" onClick={this.props.onNavigate}>
              Login
            </Link>
            : null}

          {!isLoggedIn ?
            <Link to="/signup" className="menu__item" onClick={this.props.onNavigate}>
              Signup
            </Link>
            : null}

          {isLoggedIn ?
            <Link to="/dashboard" className="menu__item" onClick={this.props.onNavigate}>
              Profile
            </Link>
            : null}

          {isLoggedIn ?
            <Link to="/leaders" className="menu__item" onClick={this.props.onNavigate}>
             Stats
            </Link>
            : null}

          {isLoggedIn ?
            <Link to="/play" className="menu__item" onClick={this.props.onNavigate}>
              Play
            </Link>
            : null}

          {isLoggedIn ?

            <p className="menu__item" onClick={this._handleLogout}>
              Logout
            </p>
            : null}


        </div>

      </div>
    );
  }

}


export default withRouter(onClickOutside(Menu));

