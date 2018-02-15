import React from 'react';

const updateButton = props => (
  <button
    className="btn btn-sm btn-warning"
    onClick={() => props.onUpdate(props.item)}>
    Modifier
  </button>
);

export default updateButton;
