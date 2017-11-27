import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

class Tableau extends Component {
  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleUpdate(obj) {
    this.props.onUpdate(obj);
  }

  handleDelete(obj) {
    this.props.onDelete(obj);
  }

  render() {
    const tableHeader = this.props.listHeaders.map((item, index) => {
      return <TableHeader header={item} key={index} />
    });

    const tableBody = this.props.listBody.map((item, index) => {
      return <TableBody
        item={item}
        key={index}
        itemKey={this.props.listKey}
        rowStyle={this.props.rowStyle}
        consulterButton={this.props.consulterButton}
        onDelete={this.handleDelete}
        onUpdate={this.handleUpdate} />
    });

    return (
      <table className={this.props.tableStyle}>
        <thead>
          <tr>
            {tableHeader}
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    );
  }
}

Tableau.prototypes = {
  listHeaders: PropTypes.arrayOf(PropTypes.string),
  listBody: PropTypes.arrayOf(PropTypes.object),
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  tableBody: PropTypes.element.isRequired,
  tableHeader: PropTypes.element.isRequired,
  tableStyle: PropTypes.string,
  consulterButton: PropTypes.bool
};

export default Tableau;
