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
        .catch((error) => {
        console.log(error, "the error in SignUP.js")
          window.error = error
        this.setState({theError: "Note: " + error.response.body.message})
      })
    }
    else {
      this.setState({theError: "Please include e-mail, password, and username in the signup form."})
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

        <div className="SignupBox">

            <p className="psign">E-Mail</p>
            <input type="text" ref="email" placeholder='login'
                   onKeyUp={this._handleTyping}
            />
            <p className="psign">Password</p>
            <input type="password" ref="password" placeholder='password'
                   onKeyUp={this._handleTyping}
            />
            <p className="psign">Username</p>
            <input type="text" ref="username" placeholder='username'
                   onKeyUp={this._handleTyping}
            />
            <p className="psign">Interests</p>
            <input type="text" ref="interests" placeholder='interests'
                   onKeyUp={this._handleTyping}
            />
            <button className="signupbutton" onClick={this._handleSignUp}>Create an Account</button>

            <h3>{this.state.theError}</h3>

          </div>

      </div>
    )
  }

}
