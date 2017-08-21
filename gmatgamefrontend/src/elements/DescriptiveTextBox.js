import React from 'react';
import './DescriptiveTextBox.css';

export default (props) => {
    return (
        <div
          style=
          {{
            backgroundColor: props.bgColor ? props.bgColor : "lightgray",
            color : props.color ? props.color : "black",
            fontSize : props.fontSize ? props.fontSize : "1rem",
            // width : props.width ? props.width : "30%",
            border : props.border ? props.border : "none",
            borderRadius: props.radius ? props.radius : "none"
          }}
          className="textbox"
          onClick={props.onClick}
        >
          <p>{props.theText}</p>
        </div>
    )
}
