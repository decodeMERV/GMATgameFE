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
import LeaderBoard from "./pages/LeaderBoard";
import Page404 from "./pages/Page404";
import AdminDashBoard from "./pages/AdminDashboard";

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={(props) => <App {...props} loggedIn={auth.isLoggedIn()} />}>
      <IndexRoute component={LoginHomePage} onEnter={(nextState, replace)=>{
        if (auth.isLoggedIn()){
          replace("/dashboard");
        }
      }}/>
      <Route path="play" component={PlayGame} onEnter={(nextState, replace) => {
        if (!auth.isLoggedIn()){
          replace("/");
        }
      }}/>
      <Route path="signup" component={SignUp}/>
      <Route path="leaders" component={LeaderBoard}/>
      <Route path="dashboard" component={UserProfile} onEnter={(nextState, replace)=>{
        if (!auth.isLoggedIn()){
          replace("/");
        }
      }}/>
      <Route path="patron" getComponent={(nextState, callback) => {
        auth.getCurrentLoggedInUser(auth.getToken())
          .then((res) => {
            if (!res.body.admin){
              callback(null, Page404)
            }
            else {
              callback(null, AdminDashBoard)
            }
          })
          .catch( () => callback(null, Page404) )
      }}/>
      <Route path="*" component={Page404}/>
    </Route>
  </Router>
)

ReactDOM.render(routes, document.getElementById('root'));
