import React from 'react';

/**
 * Select input
 * @param {[string]} cssClasses css classe
 * @param {string} name name
 * @param {string} id id
 * @param {*} value object
 * @param {function} handleChange onChange handler
 * @param {string} defaultOptionValue
 * @param {string} defaultOption
 * @param {element} options
 */
const select = props => {
  const inputClasses = ['form-control', ...props.cssClasses];
  return (
    <select
      className={inputClasses.join(' ')}
      name={props.name}
      id={props.id}
      value={props.value}
      onChange={props.handleChange}>
      <option value={props.defaultOptionValue}>{props.defaultOption}</option>
      {props.options}
    </select>
  );
};

export default select;
