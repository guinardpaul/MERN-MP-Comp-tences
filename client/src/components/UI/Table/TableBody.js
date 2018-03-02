import React from 'react';
import Button from './Button/Button';

const tableBody = props => {
  const tableItems = props.columns.map(header => {
    return (
      <td key={props.item[header.accessor]}>{props.item[header.accessor]}</td>
    );
  });

  let button = null;
  if (props.consulterButton) {
    const AddBtncss = ['btn', 'btn-sm', 'btn-success'];
    button = (
      <Button
        cssClasses={AddBtncss}
        item={props.item}
        clicked={() => props.onConsulter(props.item)}>
        Consulter
      </Button>
    );
  }

  const updateBtnCss = ['btn', 'btn-sm', 'btn-warning'];
  const deleteBtnCss = ['btn', 'btn-sm', 'btn-danger'];

  let buttons = null;
  if (props.btnStyle) {
    buttons = (
      <div className="btn-group-vertical">
        {button}
        <Button
          cssClasses={updateBtnCss}
          item={props.item}
          clicked={() => props.onUpdate(props.item)}>
          Modifier
        </Button>
        <Button
          cssClasses={deleteBtnCss}
          item={props.item}
          clicked={() => props.onDelete(props.item)}>
          Supprimer
        </Button>
      </div>
    );
  } else {
    buttons = (
      <div className="btn-group">
        {button}
        <Button
          cssClasses={updateBtnCss}
          item={props.item}
          clicked={() => props.onUpdate(props.item)}>
          Modifier
        </Button>
        <Button
          cssClasses={deleteBtnCss}
          item={props.item}
          clicked={() => props.onDelete(props.item)}>
          Supprimer
        </Button>
      </div>
    );
  }

  return (
    <tr>
      {tableItems}
      <td>{buttons}</td>
    </tr>
  );
};

export default tableBody;
