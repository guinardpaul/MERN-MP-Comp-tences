import React from 'react';

/**
 * Button
 * @param {[string]} cssClasses Button css
 * @param {string} clicked function onClick
 * @param {object} item Object
 * @param {string} btnTitle Button title
 */
const button = props => {
  let submit = null;
  if (props.submit) {
    submit = 'submit';
  }

  return (
    <button
      type={submit}
      className={props.cssClasses.join(' ')}
      onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default button;
