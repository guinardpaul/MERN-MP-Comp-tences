import React from 'react';

const consulterButton = props => (
  <button
    className="btn btn-sm btn-success"
    onClick={() => props.onConsulter(props.item)}>
    Consulter
  </button>
);

export default consulterButton;
