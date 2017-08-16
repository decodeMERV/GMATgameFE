import React, {Component} from 'react';
import { Link } from 'react-router';
import './LoginHomePage.css';
import auth from '../auth';
import ProfileBox from '../elements/ProfileBox';
const ENTER = 13;

export default class LoginHomePage extends Component {



  constructor(){
    super();
    this.state={}
  }


  _handleLogin = () => {
    // deep destructuring equivalent to (let email = this.refs.email.value;)
    let { email: {value: email}, password: {value: password} } = this.refs;
    if (email && password) {
      auth.login(email, password)
        .then(res => this.props.router.push('/play'))
        .catch( () => this.setState({theError : "Wrong username or password"}) )
    }
    else {
      this.setState({ error: "Please enter an email and password"})
    }
  }

  _handleTyping = (e) => {
    if (this.state && this.state.error) {
      this.setState({ error: null })
    }
    if (e.keyCode===ENTER) {
      this._handleLogin()
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

  render() {

    if (auth.isLoggedIn()){



      return(
        <div className="profile-container">
          <img src={this.state.avatarUrl} alt="gravatar" style={{borderRadius:"50%"}}/>
          <ProfileBox name={this.state.username} contact={this.state.email} aboutMe={this.state.interests} />
        </div>
      )
    }


    return (
      <div className="login">
        <input type="text" ref="email"
               onKeyUp={this._handleTyping}
        />
        <input type="password" ref="password"
               onKeyUp={this._handleTyping}
        />
        <button className="logonbutton" onClick={this._handleLogin}>Login</button>
          <Link to="/SignUp" className="signupbutton">Create an Account</Link>
        <h3>{this.state.theError}</h3>
      </div>
            )
       }



}
