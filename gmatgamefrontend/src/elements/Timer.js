import React from 'react';
import './Timer.css';
import moment from 'moment';

const Timer = (props) => (
  <div className="timer">{moment(props.time).format('mm:ss')}</div>
);

export default Timer;
