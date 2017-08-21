import React from 'react';
import './DeleteButton.css';

export default (props) => (
  <div className="add-button" onClick={props.onClick}>
    <i className="fa fa-trash fa-2x"/>
  </div>
)