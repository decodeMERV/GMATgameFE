import React, {Component} from 'react';
import './LeaderBoard.css';
//import ProfileBox from '../elements/ProfileBox';
//import auth from '../auth.js';
import api from '../api.js';

export default class LeaderBoard extends Component {
  constructor(){
    super();
    this.state = {
      leaders : ["loading leaderboard"]
    }

  }
  componentDidMount(){
    this.fetchLeader(); //By default if we don't send the level param and the correct boolean and will start at the initial question
  }

  // renderLeaders(stat) {
  //   return (
  //     <li key={stat.name} className="user-info__stat">
  //       <Link to={stat.url}>
  //         <p className="user-info__stat-value">{stat.value}</p>
  //         <p className="user-info__stat-name">{stat.name}</p>
  //       </Link>
  //     </li>
  //   );
  // }

  fetchLeader = () => {
    api.getLeader()
      .then( res => {
        this.setState({leaders : res})
      })
      .catch( error => {
        this.setState({
          Q: "Error loading leaders: " + error
        })
      })
  }



  render(){

    console.log(this.state.leaders)
    return (
      <div className="leader-container">



      </div>
    );
  }
}