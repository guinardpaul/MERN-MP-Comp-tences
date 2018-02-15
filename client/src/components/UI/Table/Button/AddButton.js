import React from 'react';

const addButton = props => (
  <button className="btn btn-primary" onClick={props.onAddClick}>
    {props.btnTitle}
  </button>
);

export default addButton;
