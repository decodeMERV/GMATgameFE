import React from 'react';
import './Answer.css';

export default (props) => {
    return (
        <div
            style=
                {{
                    backgroundColor: props.bgColor ? props.bgColor : "lightgray",
                    color : props.color ? props.color : "black",
                    fontSize : props.fontSize ? props.fontSize : "1rem",

                }}
            className="answer"
            onClick={props.onClick}
        >
            {props.answerText}
        </div>
    );
}

// click on answer, true or false
// prevent other clicks
// show next, onclick of that button will fire off to that api call