import React from 'react';
import Tableau from '../../UI/Table/Tableau';

const evaluationTableau = props => {
  const evaluationsHeader = [
    { header: 'Description', accessor: 'description' },
    { header: 'Date de création', accessor: 'created_at' },
    { header: 'Trimestre', accessor: 'trimestre_literal' }
  ];
  const tableStyle = ['table-striped'];
  const rowStyle = [200, 150, 150];

  return (
    <Tableau
      consulterButton
      onConsulter={props.onConsulter}
      onUpdate={props.onUpdate}
      onDelete={props.onDelete}
      columns={evaluationsHeader}
      data={props.data}
      expandableList={props.expandableList}
      tableStyle={tableStyle}
      rowStyle={rowStyle}
      btnStyleVertical={props.btnStyleVertical}
      selectedRow={props.selectedRow}
      caption="Evaluations"
    />
  );
};

export default evaluationTableau;
