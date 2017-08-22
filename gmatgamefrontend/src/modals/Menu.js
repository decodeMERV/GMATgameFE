import React, { Component } from 'react';
import { Link } from 'react-router';
import auth from '../auth';
// import api from '../../api';
import './Menu.css';
// import Logout from "../Logout";


class Menu extends Component {

  constructor(props){
    super(props);
    this.state = {
      isUserLoggedIn : false
    };
  }

  componentDidMount(){
    // this.fetchProfilePic()
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.isUserLoggedIn !== prevState.isUserLoggedIn) {
      this.setState({ url: ""})
    }
  }

  // fetchProfilePic = () => {
  //   return auth.getCurrentLoggedInUser(auth.getToken())
  //     .then(res => {
  //       this.setState({
  //         url : res.body.avatarUrl
  //       });
  //     })
  //     .catch(error => {
  //       console.log("error, user not logged in to get pic " + error);
  //     })
  // }

  changeLoggedIn = () => { this.setState({isUserLoggedIn : !this.state.isUserLoggedIn}) }

  render() {
    let { show } = this.props
    const isLoggedIn = auth.isLoggedIn()
    return (
      <div className={`menu ${show?"show":""}`} onClick={console.log}>
        {/*<div className="menu__header">*/}
          {/*<i className="fa fa-bars fa-2x menu-icon"*/}
             {/*onClick={closeMenu}/>*/}
        {/*</div>*/}

        <div className="menu__list">

          {isLoggedIn ?
          <Link to="/" className="menu__item" onClick={this.props.onNavigate}>
            Home
          </Link>
            : null}

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
            <Link to="/" className="menu__item" onClick={this.props.onNavigate}>
              Logout
            </Link>
            : null}



        </div>

      </div>
    );
  }

}

export default Menu;