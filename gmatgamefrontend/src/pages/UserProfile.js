import React, {Component} from 'react';
import './UserProfile.css';
import ProfileBox from '../elements/ProfileBox';
import auth from '../auth.js';

export default class UserProfile extends Component {
  constructor(){
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
          interests : res.body.interests,
          email: res.body.email
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.logOutProp !== prevProps.logOutProp){
      this.setState({
        username : "",
        avatarUrl : "",
        interests : "",
        email: ""
      })
    }
  }

   render(){
    console.log("REDNER")
    return (
      <div className="profile-container">
        <img src={this.state.avatarUrl} alt="gravatar" style={{borderRadius:"50%"}}/>
        <ProfileBox name={this.state.username} contact={this.state.email} aboutMe={this.state.interests} />
      </div>
    );
  }
}