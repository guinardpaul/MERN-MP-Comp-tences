import React from 'react';
import Tableau from '../../UI/Table/Tableau';

const classeTableau = props => {
  const elevesHeader = [
    { header: 'Nom', accessor: 'first_name' },
    { header: 'Prénom', accessor: 'last_name' }
  ];
  const tableStyle = ['table-striped'];
  const rowStyle = [200, 150, 150];
  const itemKey = ['nom', 'prenom'];

  return (
    <Tableau
      consulterButton
      onConsulter={props.onConsulter}
      onUpdate={props.onUpdate}
      onDelete={props.onDelete}
      columns={elevesHeader}
      data={props.data}
      expandableList={props.expandableList}
      tableStyle={tableStyle}
      rowStyle={rowStyle}
      btnStyleVertical={props.btnStyleVertical}
      selectedRow={props.selectedRow}
      caption="Elèves"
    />
  );
};
export default classeTableau;
