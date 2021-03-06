import React from 'react';
import Tableau from '../../UI/Table/Tableau';

const domaineTableau = props => {
  const domainesHeader = [
    { header: 'Référence', accessor: 'ref' },
    { header: 'Description', accessor: 'description' }
  ];
  const tableStyle = 'table table-striped table-hover';
  const rowStyle = [100, 100, 300];

  return (
    <Tableau
      consulterButton
      onConsulter={props.onConsulter}
      onUpdate={props.onUpdate}
      onDelete={props.onDelete}
      columns={domainesHeader}
      data={props.data}
      expandableList={props.expandableList}
      tableStyle={tableStyle}
      rowStyle={rowStyle}
      btnStyleVertical={props.btnStyleVertical}
      selectedRow={props.selectedRow}
      caption="Domaines"
    />
  );
};

export default domaineTableau;
