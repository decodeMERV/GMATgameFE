import React from 'react';
import './Question.css';

export default (props) => {
  return (
    <div
      style=
        {{
          backgroundColor: props.bgColor ? props.bgColor : "white",
          color : props.color ? props.color : "black",
          fontSize : props.fontSize ? props.fontSize : "1rem",
          maxWidth: props.maxWidth ? props.maxWidth : "90%",
        }}
      className="question"
    >
      {props.questionText}
    </div>
  );
}