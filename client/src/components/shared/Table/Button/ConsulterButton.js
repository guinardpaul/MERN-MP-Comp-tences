import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ConsulterButton extends Component {
  constructor(props) {
    super(props);

    this.onConsulter = this.onConsulter.bind(this);
  }

  onConsulter() {
    this.props.onConsulter(this.props.item);
  }

  render() {
    return (
      <button className="btn btn-success" onClick={this.onConsulter}>Consulter</button>
    );
  }
}

ConsulterButton.PropTypes = {
  onConsulter: PropTypes.func,
  item: PropTypes.Object
}

export default ConsulterButton;
