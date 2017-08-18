import React, {Component} from 'react';
import './SignUp.css';
import auth from '../auth';

const ENTER = 13;

export default class LoginHomePage extends Component {

  constructor() {
    super();
    this.state = {}
  }

  _handleSignUp = () => {
    // deep destructuring equivalent to (let email = this.refs.email.value;)
    let {email: {value: email}, password: {value: password}, username: {value: username}, interests: {value: interests}} = this.refs;
    if (email && password && username) {
      auth.signUp(email, password, username, interests)
        .then(res => this.props.router.push('/'))
        .catch(() => this.setState({theError: "Please correct your values above."}))
    }
    else {
      this.setState({error: "Please complete the signup form"})
    }
  }

  _handleTyping = (e) => {
    if (this.state && this.state.error) {
      this.setState({error: null})
    }
    if (e.keyCode === ENTER) {
      this._handleSignUp()
    }
  }

  render() {
    return (
      <div className="signer">
        <p>E-Mail</p>
        <input type="text" ref="email" defaultValue='login'
               onKeyUp={this._handleTyping}
        />
        <p>Password</p>
        <input type="password" ref="password" defaultValue='password'
               onKeyUp={this._handleTyping}
        />
        <p>Username</p>
        <input type="username" ref="username" defaultValue='username'
               onKeyUp={this._handleTyping}
        />
        <p>Interests</p>
        <input type="interests" ref="interests" defaultValue='interests'
               onKeyUp={this._handleTyping}
        />
        <button className="signupbutton" onClick={this._handleSignUp}>Create an Account</button>

        <h3>{this.state.theError}</h3>
      </div>
    )
  }

}
