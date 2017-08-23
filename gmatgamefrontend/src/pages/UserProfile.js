import React, {Component} from 'react';
import { Link, withRouter } from 'react-router';
import './UserProfile.css';
import ProfileBox from '../elements/ProfileBox';
import auth from '../auth.js';
import Api from '../api.js';

//const ENTER = 13;

export default class UserProfile extends Component {
  constructor(){
    super();
    this.state = {
      editOpen: false,
      closeEdit: false
    }
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
          email: res.body.email,
          admin: res.body.admin
        })
      })
  }

  handleEdit = () => {
    let username = this.state.username;
    let email = this.state.email;
    let interests = this.state.interests;

    Api.editProfile(username, email, interests, localStorage.token)
    .then(res => this.props.router.push('/dashboard'))
    .catch(() => this.setState({theError: 'Oups something went wrong...Try again later'}))
  }

  openingEdit = (e) => {
    e.preventDefault();
    this.setState({
      editOpen: true,
    })
  }

  closingEdit = (e) => {
    e.preventDefault();
    this.setState({
      closeEdit: true,
      editOpen: false
    })
    this.handleEdit()
  }

  onChangedValue = (e) => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.loggedInProp !== prevProps.loggedInProp && prevProps.loggedInProps === false){
      this.setState({
        username : "",
        avatarUrl : "",
        interests : "",
        email: ""
      })
    }
  }

//We can get rid of CDU and check if user is logged in with ternary render or not
   render(){

    return (
      <div className="profile-container">
        <ProfileBox name={this.state.username} contact={this.state.email} aboutMe={this.state.interests}
        openingEdit={this.openingEdit} editOpen={this.state.editOpen} onChange={this.onChangedValue}
         closingEdit={this.closingEdit} closeEdit={this.state.closeEdit}/>
        {this.state.admin ?  <Link to="/patron" className="menu__item" onClick={this.props.onNavigate}> Admin </Link> : null}
      </div>
    );
  }
}
