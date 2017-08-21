import React, {Component} from 'react';
import './UserProfile.css';
import ProfileBox from '../elements/ProfileBox';
import auth from '../auth.js';
import Api from '../api.js';

const ENTER = 13;

export default class UserProfile extends Component {
  constructor(){
    super();
    this.state = {
      editOpen: false,
      keyUp: false
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
          email: res.body.email
        })
      })
  }
  handleEdit = () => {
    let username = this.state.username;
    let email = this.state.email;
    let interests = this.state.interests;
    console.log(username, email, interests )
    Api.editProfile(username, email, interests, localStorage.token)
  //  .then( res => console.log(res))
    .then(res => this.props.router.push('/dashboard'))
    // //     .catch(() => this.setState({theError: 'Oups something went wrong...Try again later'}))
    // // )
  }

  handleEditButton = (e) => {
    e.preventDefault();
  //  console.log(e.target, 'this is the target')
    let buttonValue = e.target.name;
    this.setState({
      editOpen: true,
      button: buttonValue
    })
  }
  onChangedValue = (e) => {
    //  e.preventDefault();
      let newInput = e.target.value;
      console.log(e.target.name, 'target event ')
      console.log(this.state.username, 'USERNAME')
      if(e.target.name === 'username'){
        this.setState({
          username: newInput
        })
      }
      else if(e.target.name === 'email'){
        this.setState({
          email: newInput
        })
      }
      else{
        this.setState({
          interests: newInput
        })
      }
  }

  handleTyping = (e) => {
    if (this.state && this.state.error) {
      this.setState({error: null})
    }
    if (e.keyCode === ENTER) {
      this.setState({
        keyUp: true
      })
      this.handleEdit()
    }
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
        <img src={this.state.avatarUrl} alt="gravatar" style={{borderRadius:"50%"}}/>
        <ProfileBox form={this.state.input} button={this.state.button}
        name={this.state.username} contact={this.state.email} aboutMe={this.state.interests}
        toggle={this.handleEditButton} editOpen={this.state.editOpen}
        onChange={this.onChangedValue} onKeyUp={this.handleTyping} keyUp={this.state.keyUp} />
      </div>
    );
  }
}
