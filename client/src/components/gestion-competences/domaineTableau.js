import React, { Component } from 'react';
import Tableau from '../UI/Table/Tableau';

class DomaineTableau extends Component {
  state = {
    domainesHeader: ['Référence', 'Description'],
    tableStyle: 'table table-striped',
    rowStyle: [100, 100, 200],
    itemKey: ['ref_domaine', 'description_domaine']
  };

  render() {
    return (
      <Tableau
        onUpdate={this.props.onUpdate}
        onDelete={this.props.onDelete}
        listHeaders={this.state.domainesHeader}
        listBody={this.props.listBody}
        listKey={this.state.itemKey}
        tableStyle={this.state.tableStyle}
        rowStyle={this.state.rowStyle}
      />
    );
  }
}

export default DomaineTableau;
