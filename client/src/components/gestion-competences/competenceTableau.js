import React, { Component } from 'react';
import Tableau from '../UI/Table/Tableau';

class competenceTableau extends Component {
  state = {
    competencesHeader: ['Référence', 'Description'],
    tableStyle: 'table table-striped',
    rowStyle: [100, 100, 200],
    itemKey: ['ref_ct', 'description_ct']
  };

  render() {
    return (
      <Tableau
        onUpdate={this.props.onUpdate}
        onDelete={this.props.onDelete}
        listHeaders={this.state.competencesHeader}
        listBody={this.props.listBody}
        listKey={this.state.itemKey}
        tableStyle={this.state.tableStyle}
        rowStyle={this.state.rowStyle}
      />
    );
  }
}

export default competenceTableau;
