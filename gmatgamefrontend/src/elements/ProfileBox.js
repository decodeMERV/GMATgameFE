import React from 'react';
import './ProfileBox.css';

export default (props) => {
  console.log(props.button, 'inside profile box')
  return (
    <div className="profilebox">
      <h2>Username</h2>
      {props.editOpen === true && props.button === 'name' ? <input defaultValue={props.name}/> : <h3>{props.name}</h3>}
      <button name='name' onClick={(e) => props.toggle(e)}>Edit</button>
      <h2>E-Mail</h2>
      {props.editOpen === true && props.button === 'email' ? <input placeholder={props.contact}/> : <h3>{props.contact}</h3>}
      <button name='email' onClick={(e) => props.toggle(e)}>Edit</button>
      <h2>Interests</h2>
      {props.editOpen === true && props.button === 'aboutMe' ? <input placeholder={props.aboutMe}/> : <h3>{props.aboutMe}</h3>}
      <button name="aboutMe" onClick={(e) => props.toggle(e)}>Edit</button>
    </div>
  )
}
