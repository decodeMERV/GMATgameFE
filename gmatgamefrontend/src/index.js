import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import LoginHomePage from "./pages/LoginHomePage";
import PlayGame from "./pages/PlayGame";
import UserProfile from "./pages/UserProfile";

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LoginHomePage}/>
      <Route path="/play" component={PlayGame}/>
      {/*<Route path="/signup" component={SignUp}/>*/}
      <Route path="/dashboard" component={UserProfile}/>
    </Route>
  </Router>
)

ReactDOM.render(routes, document.getElementById('root'));
