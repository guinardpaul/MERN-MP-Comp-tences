import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DeleteButton extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    console.log(this.props.item);
    this.props.onDelete(this.props.item);
  }

  render() {
    return (
      <button className="btn btn-danger" onClick={this.onDelete}>Supprimer</button>
    );
  }
}

DeleteButton.PropTypes = {
  onDelete: PropTypes.func,
  item: PropTypes.Object
}

export default DeleteButton;
