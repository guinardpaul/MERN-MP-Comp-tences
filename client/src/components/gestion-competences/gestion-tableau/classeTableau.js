import React from 'react';
import Tableau from '../../UI/Table/Tableau';

const classeTableau = props => {
  const classesHeader = [
    {
      header: 'Nom',
      accessor: 'name'
    },
    {
      header: 'Cycle',
      accessor: 'literal'
    }
  ];
  const tableStyle = 'table table-striped';
  const rowStyle = [100, 100, 200];
  const itemKey = ['nom_classe', 'cycle'];

  return (
    <Tableau
      consulterButton
      onConsulter={props.onConsulter}
      onUpdate={props.onUpdate}
      onDelete={props.onDelete}
      columns={classesHeader}
      data={props.data}
      expandableList={props.expandableList}
      tableStyle={tableStyle}
      rowStyle={rowStyle}
      btnStyleVertical={props.btnStyleVertical}
      selectedRow={props.selectedRow}
      caption="Classes"
    />
  );
};

export default classeTableau;
