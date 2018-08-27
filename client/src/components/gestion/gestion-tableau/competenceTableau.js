import React from 'react';
import Tableau from '../../UI/Table/Tableau';

const competenceTableau = props => {
  const competencesHeader = [
    { header: 'Référence', accessor: 'ref' },
    { header: 'Description', accessor: 'description' }
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
      btnStyleVertical
      caption="Sous-Domaines & Compétences"
    />
  );
};

export default competenceTableau;
