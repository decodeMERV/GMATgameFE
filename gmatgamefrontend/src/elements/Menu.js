import React, { Component } from 'react';
import { Link } from 'react-router';
import auth from '../auth.js';
import Logout from "../Logout.js";


class Menu extends Component {

    constructor(props) {
      super(props);
      this.state = {
        url : ""
      };
    }

    handleClickOutside = () => {
      this.props.closeMenu();
    }

    componentDidUpdate(prevProps, prevState) {

  //this checks the router endpoint and makes an API call to gravatar if there is no logged-in user, it also clears the router endpoint to an empty string
      if(auth.isLoggedIn()) {
        if(this.state.url.length <= 0) {
          this.fetchProfilePic();
        }
      }
      else {
        if (this.state.url.length > 0) {
          this.setState({
            url: ""
          });
        }
      }
    }


    changeLoggedIn = () => {this.setState({
      isUserLoggedIn: !this.state.isUserLoggedIn})
    }

    render() {
      let { closeMenu, show } = this.props
      const isLoggedIn = auth.isLoggedIn()
      return (

        <div className={`menu ${show?"show":""}`}>

          <div className="menu__header">
            {this.state.url? <img src={this.state.url} alt="profile-pic" className="menu__avatar"/>
              : <div className="no__image"/> }
          </div>

          <div className="menu__list">

            <Link to="/" className="menu__item" onClick={closeMenu}>
              Home
            </Link>

            {!isLoggedIn ?
              <Link to="/login" className="menu__item" onClick={closeMenu}>
                Login
              </Link>
              : null}

            {!isLoggedIn ?
              <Link to="/signup" className="menu__item" onClick={closeMenu}>
                Signup
              </Link>
              : null}

            {isLoggedIn ?
              <div className="menu__item" onClick={closeMenu}>
                <Logout buttonText="Logout" clickedLogout={this.changeLoggedIn}/>
              </div>
              : null}
          </div>

        </div>
      );
    }

  }


export default Menu.js;