import React from 'react';
import './ProfileBox.css';

export default (props) => {
  return (
    <div className="profilebox">
      <h2>{props.name}</h2>
      <h3>{props.contact}</h3>
      <h3>{props.aboutMe}</h3>
    </div>
  )
}