import React from 'react';
import './ProfileBox.css';
import EditButton from '../ProfileButtons/EditButton';
import DoneButton from '../ProfileButtons/DoneButton';
import CancelButton from '../ProfileButtons/CancelButton';

export default (props) => {

  return (
    <div className="profilebox">
      <div className="profilefield">
        <h2>Username</h2>
          {props.editOpen === true  ? <input type='text' name='username' defaultValue={props.name} onChange={props.onChange} onKeyUp={props.onKeyUp}/> :
          <h4>{props.name}</h4>}
      </div>
      <div className="profilefield">
        <h2>E-mail</h2>
          {props.editOpen === true ? <input type='text' name='email' defaultValue={props.contact} onChange={props.onChange} onKeyUp={props.onKeyUp}/> :
          <h4>{props.contact}</h4>}
      </div>
      <div className="profilefield">
        <h2>Interests</h2>
          {props.editOpen === true  ? <input type='text' name='interests' defaultValue={props.aboutMe} onChange={props.onChange} onKeyUp={props.onKeyUp}/> :
          <h4>{props.aboutMe}</h4>}
      </div>
        {props.editOpen === false ? <button onClick={(e) => props.openingEdit(e)}> <EditButton/> </button> : null }
        {props.editOpen === true ?  <button className='cancel-button' onClick={props.closingEdit}> <CancelButton/> </button>: null}
        {props.editOpen === true ? <button className="_done-button" onClick={props.closingEdit}> <DoneButton/> </button> : null}
    </div>
  )
}
