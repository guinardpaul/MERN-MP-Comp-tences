import React from 'react';
import TableBody from './TableBody';

const tableau = props => {
  const cssClasses = [...props.tableStyle, 'table'];

  const headers = props.columns.map(item => {
    return <th key={item.header}>{item.header}</th>;
  });

  const tableBody = props.data.map(obj => {
    return (
      <TableBody
        key={obj._id}
        item={obj}
        columns={props.columns}
        onUpdate={props.onUpdate}
        onDelete={props.onDelete}
        consulterButton={props.consulterButton}
        onConsulter={props.onConsulter}
        btnStyle={props.btnStyle}
      />
    );
  });

  return (
    <table className={cssClasses.join(' ')}>
      <thead>
        <tr>
          {headers}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{tableBody}</tbody>
    </table>
  );
};

export default tableau;
