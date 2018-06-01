import React, { Component } from 'react';
import Tableau from '../../UI/Table/Tableau';

class DomaineTableau extends Component {
  state = {
    domainesHeader: [
      { header: 'Référence', accessor: 'ref_domaine' },
      { header: 'Description', accessor: 'description_domaine' }
    ],
    tableStyle: 'table table-striped table-hover',
    rowStyle: [100, 100, 300],
    itemKey: ['ref_domaine', 'description_domaine']
  };

  render() {
    return (
      <Tableau
        consulterButton
        onConsulter={this.props.onConsulter}
        onUpdate={this.props.onUpdate}
        onDelete={this.props.onDelete}
        columns={this.state.domainesHeader}
        data={this.props.listBody}
        expandableList={this.props.expandableList}
        tableStyle={this.state.tableStyle}
        rowStyle={this.state.rowStyle}
        btnStyle={this.props.btnStyle}
      />
    );
  }
}

export default DomaineTableau;
