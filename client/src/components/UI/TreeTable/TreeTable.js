import React from 'react';

const treeTable = props => {
  const cssClasses = [...props.tableStyle, 'table'];

  const headers = props.columns.map(item => {
    return <th key={item.header}>{item.header}</th>;
  });

  const tableRow = null;

  return (
    <table className={cssClasses.join(' ')}>
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
