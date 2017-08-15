import React from 'react';
import './Answer.css';

export default (props) => {
    return (
        <div
            style=
                {{
                    backgroundColor: props.bgColor ? props.bgColor : "lightgray",
                    color : props.color ? props.color : "black",
                    fontSize : props.fontSize ? props.fontSize : "1rem"

                }}
            className="answer"
        >
            {props.answerText}
        </div>
    );
}