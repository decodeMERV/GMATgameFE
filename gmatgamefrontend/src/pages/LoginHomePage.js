import React, {Component} from 'react';
import { Link } from 'react-router';
import './LoginHomePage.css';
import auth from '../auth';

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
        .then(res => this.props.router.push('/'))
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

  render() {
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
