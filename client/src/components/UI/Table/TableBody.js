import React from 'react';
import TableItems from './TableItems';
import ConsulterButton from './Button/ConsulterButton';
import UpdateButton from './Button/UpdateButton';
import DeleteButton from './Button/DeleteButton';

const tableBody = props => {
  let sameKey = false;
  const tableItems = Object.keys(props.item).map(key => {
    props.itemKey.map(k => {
      if (k === key) {
        sameKey = true;
      }
      return null;
    });
    if (sameKey) {
      sameKey = false;
      return <TableItems key={key} data={props.item[key]} />;
    }
    return null;
  });

  let button;
  if (props.consulterButton) {
    button = (
      <ConsulterButton item={props.item} onConsulter={props.onConsulter} />
    );
  }

  return (
    <tr>
      {tableItems}
      <td>
        {button}
        <UpdateButton item={props.item} onUpdate={props.onUpdate} />
        <DeleteButton item={props.item} onDelete={props.onDelete} />
      </td>
    </tr>
  );
};

export default tableBody;
