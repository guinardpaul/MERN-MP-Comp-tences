import React from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

const tableau = props => {
  const tableHeader = props.listHeaders.map(item => {
    return <TableHeader header={item} key={item} />;
  });

  const tableBody = props.listBody.map(item => {
    return (
      <TableBody
        onClick={item => this.props.handleClick(item)}
        item={item}
        key={item._id}
        itemKey={props.listKey}
        rowStyle={props.rowStyle}
        consulterButton={props.consulterButton}
        onUpdate={props.onUpdate}
        onDelete={props.onDelete}
      />
    );
  });

  return (
    <table className={props.tableStyle}>
      <thead>
        <tr>{tableHeader}</tr>
      </thead>
      <tbody>{tableBody}</tbody>
    </table>
  );
};

export default tableau;
