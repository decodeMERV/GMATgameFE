import React, {Component} from 'react';
import './LeaderBoard.css';
import api from '../api.js';

export default class LeaderBoard extends Component {
  constructor() {
    super();
    this.state = {
      leaders: []
    }

  }

  componentDidMount() {
    this.fetchLeader(); //By default if we don't send the level param and the correct boolean and will start at the initial question
  }


  fetchLeader = () => {
    api.getLeader()
      .then(res => {
        this.setState({leaders: this.state.leaders.concat(res.body)})

      })
      .catch(error => {
        this.setState({
          Q: "Error loading leaders: " + error
        })
      })
  }


  render() {
    return (
      <div>
      <h1 className="lbh"> Hall of Fame </h1>
      <div className="lbtab">
          <table>


            <tbody>
            <tr>
              <th>User</th>
              <th>Total Score</th>
              <th>Games Played</th>

            </tr>

            {this.state.leaders.map((item) => (
              <tr key={item.user}>
                <td className="col1">{item.user}</td>
                <td className="col2">{item.total}</td>
                <td className="col3">{item.cnt}</td>
              </tr>
            ))}

            </tbody>
          </table>
      </div>
      </div>

    );
  }
}