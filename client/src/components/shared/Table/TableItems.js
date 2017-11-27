import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableItems extends Component {
  render() {
    const data = this.props.data;
    return (
      <td>{data}</td>
    );
  }
}

TableItems.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default TableItems;
