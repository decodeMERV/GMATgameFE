import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import auth from './auth';
import App from './App';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import LoginHomePage from "./pages/LoginHomePage";
import PlayGame from "./pages/PlayGame";
import UserProfile from "./pages/UserProfile";
import SignUp from "./pages/SignUp";
import Page404 from "./pages/Page404";

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LoginHomePage} onEnter={(nextState, replace)=>{
        if (auth.isLoggedIn()){
          replace("/dashboard");
        }
      }}/>
      <Route path="play" component={PlayGame}/>
      <Route path="signup" component={SignUp}/>
      <Route path="dashboard" component={UserProfile} onEnter={(nextState, replace)=>{
        if (!auth.isLoggedIn()){
          replace("/");
        }
      }}/>
      <Route path="*" component={Page404}/>
    </Route>
  </Router>
)

ReactDOM.render(routes, document.getElementById('root'));
