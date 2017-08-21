import React from 'react';
import './Dropdown.css';

export default (props) => (
  <select className="dropdown-menu" onChange={props.onChange}>
    {
      props.passedArray.map( (item, index) => {
        return (
          <option value={props.useItemValueOrIndex ? item : (index + 1)} key={item}>
            {props.textBefore ? props.textBefore : null}
            {props.showItem ? item : null}
            {props.textAfter ? props.textAfter : null}
          </option>
        )
      })
    }
  </select>
)