import React, { Component } from 'react';
import { Link } from 'react-router';
import onClickOutside from 'react-onclickoutside';
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

  handleClickOutside = () => {
    this.props.closeMenu();
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
    let { closeMenu, show } = this.props
    const isLoggedIn = auth.isLoggedIn()
    return (
      <div className={`menu ${show?"show":""}`}>


        <div className="menu__list">

          {isLoggedIn ?
          <Link to="/" className="menu__item" onClick={closeMenu}>
            Home
          </Link>
            : null}

          {!isLoggedIn ?
            <Link to="/" className="menu__item" onClick={closeMenu}>
              Login
            </Link>
            : null}

          {!isLoggedIn ?
            <Link to="/signup" className="menu__item" onClick={closeMenu}>
              Signup
            </Link>
            : null}

          {isLoggedIn ?
            <Link to="/dashboard" className="menu__item" onClick={closeMenu}>
              Dashboard
            </Link>
            : null}

          {isLoggedIn ?
            <Link to="/leaders" className="menu__item" onClick={closeMenu}>
             Leaderboard
            </Link>
            : null}

          {isLoggedIn ?
            <Link to="/play" className="menu__item" onClick={closeMenu}>
              Play
            </Link>
            : null}

          {isLoggedIn ?
            <Link to="/" className="menu__item" onClick={closeMenu}>
              Logout
            </Link>
            : null}



        </div>

      </div>
    );
  }

}

export default onClickOutside(Menu);