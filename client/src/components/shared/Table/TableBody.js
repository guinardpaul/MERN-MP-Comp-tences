import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableItems from './TableItems';
import ConsulterButton from './Button/ConsulterButton';
import UpdateButton from './Button/UpdateButton';
import DeleteButton from './Button/DeleteButton';

class TableBody extends Component {
  constructor(props) {
    super(props);

    this.handleConsulter = this.handleConsulter.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleConsulter(obj) {
    console.log(obj);
  }

  handleUpdate(obj) {
    this.props.onUpdate(obj);
  }

  handleDelete(obj) {
    this.props.onDelete(obj);
  }

  render() {
    let sameKey = false;
    const tableItems = Object.keys(this.props.item).map(key => {
      this.props.itemKey.map(k => {
        if (k === key) {
          sameKey = true;
        }
        return null;
      });
      if (sameKey) {
        sameKey = false;
        return <TableItems key={key} data={this.props.item[key]} />
      }
      return null;
    });

    let button;
    if (this.props.consulterButton) {
      button = <ConsulterButton item={this.props.item} onConsulter={this.handleConsulter} />
    }

    return (
      <tr>
        {tableItems}
        <td>
          {button}
          <UpdateButton item={this.props.item} onUpdate={this.handleUpdate} />
          <DeleteButton item={this.props.item} onDelete={this.handleDelete} />
        </td>
      </tr>
    );
  }
}

TableBody.PropTypes = {
  handleConsulter: PropTypes.func,
  handleDelete: PropTypes.func,
  handleUpdate: PropTypes.func,
  componentDidMount: PropTypes.func,
  item: PropTypes.object,
  itemKey: PropTypes.arrayOf(PropTypes.string),
  tableItems: PropTypes.element,
  sameKey: PropTypes.bool,
  consulterButton: PropTypes.bool
}

export default TableBody;
