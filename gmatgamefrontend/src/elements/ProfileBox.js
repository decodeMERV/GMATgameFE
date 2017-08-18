import React from 'react';
import './ProfileBox.css';

export default (props) => {
  return (
    <div className="profilebox">
      <h2>Username</h2>
      <h3>{props.name}</h3>
      <h2>E-Mail</h2>
      <h4>{props.contact}</h4>
      <h2>Interests</h2>
      <h4>{props.aboutMe}</h4>
    </div>
  )
}
