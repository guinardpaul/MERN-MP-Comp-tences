import React from 'react';
import Tableau from '../../UI/Table/Tableau';

const competenceTableau = props => {
  const competencesHeader = [
    { header: 'Référence', accessor: 'ref_ct' },
    { header: 'Description', accessor: 'description_ct' }
  ];
  const tableStyle = 'table table-striped';
  const rowStyle = [100, 100, 200];

  return (
    <Tableau
      onUpdate={props.onUpdate}
      onDelete={props.onDelete}
      columns={competencesHeader}
      data={props.data}
      tableStyle={tableStyle}
      rowStyle={rowStyle}
      btnStyle
    />
  );
};

export default competenceTableau;
