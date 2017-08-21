import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';
import Menu from './modals/Menu';
import auth from './auth.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      avatarUrl: "",
      isMenuOpen: false
    }
  }

  closeMenu = () => this.setState({ isMenuOpen: false })

  componentDidMount(){
    if (this.props.loggedIn){
      this.fetchUserProfile();
    }
  }

  fetchUserProfile = () => {
    auth.getCurrentLoggedInUser(auth.getToken())
      .then( (res) => {
        this.setState({
          username : res.body.username,
          avatarUrl : res.body.avatarUrl,
        })
      })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.loggedIn !== this.props.loggedIn) {
      if (newProps.loggedIn) {
        this.fetchUserProfile();
      }
      else {
        this.setState({ avatarUrl: "" });
      }
    }
  }

  render() {
    let {isMenuOpen} = this.state

    return (
      <div className="App">

        <div className="App-navbar">

          {/*<div className="App-menubar">*/}
            <i className="fa fa-bars fa-2x menu-icon"
               onClick={()=>this.setState({ isMenuOpen: !isMenuOpen })}/>
            {/*<Link to="/" className="App-navbar__title">Dashboardly</Link>*/}

          {/*</div>*/}

          <Menu show={isMenuOpen} closeMenu={this.closeMenu}/>




          {/* LOGO starts Below*/}



          <Link to="/" className="App-navbar__title">
          <div className="gmatimage">
            <img src={require("./gmat_logo.svg")} width="160px"/>
          </div>

          </Link>

          {
            auth.isLoggedIn() ?
                <div className="gravatarIcon">
                  <Link to="/dashboard">
                    <img src={this.state.avatarUrl} alt="gravatarIcon" style={{borderRadius:"50%", maxWidth:"3rem", backgroundColor:"#2b2b2b"}}/>
                  </Link>
                  <div>
                        {/*<p className="p-nav"*/}
                          {/*onClick={() => {*/}
                              {/*auth.logout()*/}
                              {/*.then( () => {*/}
                                {/*this.setState({avatarUrl: "", username:undefined});*/}
                                {/*this.props.router.push('/');*/}
                              {/*})*/}
                            {/*}}*/}
                            {/*>*/}
                            {/*logout</p>*/}
                      </div>
                    {/*<p>{this.state.username}</p>*/}

                </div>
            :
            null
        }

        </div>

        <div className="background-overlay">
        {React.cloneElement(this.props.children, {loggedInProp :this.props.loggedIn, username : this.state.username } )}
      </div>
      </div>
    );
  }
}


   export default App;
