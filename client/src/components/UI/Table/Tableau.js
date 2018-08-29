import React from 'react';
import TableRow from './TableRow';
import './Tableau.css';

const tableau = props => {
  const cssClasses = [...props.tableStyle, 'table'];

  const headers = props.columns.map(item => {
    return <th key={item.header}>{item.header}</th>;
  });

  const tableRow = props.data.map(obj => {
    let selectedRow = false;
    if (obj === props.selectedRow) {
      selectedRow = true;
    }

    return (
      <TableRow
        key={obj.id}
        item={obj}
        columns={props.columns}
        onUpdate={props.onUpdate}
        onDelete={props.onDelete}
        consulterButton={props.consulterButton}
        onConsulter={props.onConsulter}
        btnStyleVertical={props.btnStyleVertical}
        selectedRow={selectedRow}
      />
    );
  });

  return (
    <table className={cssClasses.join(' ')}>
      <caption className="caption">
        <h4>{props.caption}</h4>
      </caption>
      <thead>
        <tr>
          {headers}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{tableRow}</tbody>
    </table>
  );
};

export default tableau;
