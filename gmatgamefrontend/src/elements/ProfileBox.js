import React from 'react';
import './ProfileBox.css';

export default (props) => {

  return (
    <div className="profilebox">
      <h2>Username</h2>
      {props.editOpen === true  ? <input name='username' defaultValue={props.name} onChange={props.onChange} onKeyUp={props.onKeyUp}/> :
      <h3>{props.name}</h3>}

      <h2>E-mail</h2>
      {props.editOpen === true ? <input name='email' defaultValue={props.contact} onChange={props.onChange} onKeyUp={props.onKeyUp}/> :
      <h3>{props.contact}</h3>}

      <h2>Interests</h2>
      {props.editOpen === true  ? <input name='interests' defaultValue={props.aboutMe} onChange={props.onChange} onKeyUp={props.onKeyUp}/> :
       <h3>{props.aboutMe}</h3>}

      <button name="edit" onClick={(e) => props.openingEdit(e)}>Edit Profile</button>
      {props.editOpen === true ? <button name="done" onClick={props.closingEdit} >done</button> : ''}
      {props.closeEdit === true ? props.editOpen === false : ''}
    </div>
  )
}
