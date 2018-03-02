import React, { Component } from 'react';
import Tableau from '../../UI/Table/Tableau';

class competenceTableau extends Component {
  state = {
    competencesHeader: [
      { header: 'Référence', accessor: 'ref_ct' },
      { header: 'Description', accessor: 'description_ct' }
    ],
    tableStyle: 'table table-striped',
    rowStyle: [100, 100, 200]
  };

  render() {
    return (
      <Tableau
        onUpdate={this.props.onUpdate}
        onDelete={this.props.onDelete}
        columns={this.state.competencesHeader}
        data={this.props.listBody}
        tableStyle={this.state.tableStyle}
        rowStyle={this.state.rowStyle}
        btnStyle
      />
    );
  }
}

export default competenceTableau;
