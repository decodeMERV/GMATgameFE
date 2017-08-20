import React, { Component } from 'react';
import { Link } from 'react-router';
import auth from '../../auth';
import './Menu.css';
import Logout from "../Logout";

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

  componentDidMount() {
    this.fetchProfilePic();
  }

  componentDidUpdate(prevProps, prevState) {

//this checks the router endpoint and makes an API call to gravatar if there is no logged-in user
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

  fetchProfilePic = () => {
    return auth.getCurrentLoggedInUser(auth.getToken())
    .then(result => {
      this.setState({
        url : res.body.avatarUrl
      });
    })
    .catch(error => {
      console.log("error, user not logged in toget pic" + error);
    })
  }

  changeLoggedIn = () => {this.setState({
    isUserLoggedIn: !this.state.isUserLoggedIn})
  }

  render() {
    let { closeMenu, show } = this.props
    const isLoggedIn = auth.isLoggedIn()
    return (




    )
}





  }



}
