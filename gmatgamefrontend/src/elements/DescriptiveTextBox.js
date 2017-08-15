import React from 'react';
import './DescriptiveTextBox.css';

export default (props) => {
    return (
        <div
          style=
          {{
            backgroundColor: props.bgColor ? props.bgColor : "black",
            color : props.color ? props.color : "darkgray",
            fontSize : props.fontSize ? props.fontSize : "1rem"
          }}
          className="textbox"
        >
          <p>{props.theText}</p>
        </div>
    )
}
