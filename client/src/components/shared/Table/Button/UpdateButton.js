import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UpdateButton extends Component {
  constructor(props) {
    super(props);

    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate() {
    this.props.onUpdate(this.props.item);
  }

  render() {
    return (
      <button className="btn btn-warning" onClick={this.onUpdate}>Modifier</button>
    );
  }
}

UpdateButton.PropTypes = {
  onUpdate: PropTypes.func,
  item: PropTypes.Object
}

export default UpdateButton;
