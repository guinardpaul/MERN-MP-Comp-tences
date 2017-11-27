import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddButton extends Component {
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
  }

  onAdd() {
    this.props.onAddClick();
  }

  render() {
    return (
      <button className="btn btn-primary" onClick={this.onAdd}>{this.props.btnTitle}</button>
    );
  }
}

AddButton.PropTypes = {
  onAdd: PropTypes.func,
  btnTitle: PropTypes.string
}

export default AddButton;
