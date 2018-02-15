import React from 'react';

const deleteButton = props => (
  <button
    className="btn btn-sm btn-danger"
    onClick={() => props.onDelete(props.item)}>
    Supprimer
  </button>
);

export default deleteButton;
