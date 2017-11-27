import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableHeader extends Component {
  render() {
    return (
      <th>{this.props.header}</th>
    );
  }
}

TableHeader.propTypes = {
  header: PropTypes.string
};

export default TableHeader;