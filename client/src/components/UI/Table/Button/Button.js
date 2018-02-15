import React from 'react';

const button = props => (
  <button className={props.classes} onClick={() => props.clicked(props.item)}>
    {props.btnTitle}
  </button>
);
