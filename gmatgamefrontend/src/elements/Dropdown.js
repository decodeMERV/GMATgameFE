import React from 'react';
import './Dropdown.css';

export default class Dropdown extends React.Component {

  createOption(item) {
    var str = '';
    if (this.props.textBefore) {
      str = str + this.props.textBefore;
    }
    str = str + item;

    if (this.props.textAfter) {
      str = str + this.props.textAfter;
    }

    return str;
  }

  render(){
    const props = this.props;
    return(
      <select ref={props.innerRef} className="dropdown-menu" onChange={props.onChange}>
        {this.props.children}
        {
          props.passedArray.map( (item, index) => {
            return (
              <option value={props.useItemValueOrIndex ? item : (index + 1)} key={item}>
                {this.createOption(item)}
              </option>
            )
          })
        }
      </select>
    )
  }
}