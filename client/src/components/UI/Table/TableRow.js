import React from 'react';
import Button from './Button/Button';
import './Tableau.css';

const tableRow = props => {
  const cssRow = props.selectedRow ? 'selectedRow' : null;

  const tableItems = props.columns.map(header => {
    return (
      <td className={cssRow} key={props.item[header.accessor]}>
        {props.item[header.accessor]}
      </td>
    );
  });

  let addButton = null;
  if (props.consulterButton) {
    const AddBtncss = ['btn', 'btn-sm', 'btn-success'];
    addButton = (
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
  if (props.btnStyleVertical) {
    buttons = (
      <div className="btn-group-vertical">
        {addButton}
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
        {addButton}
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

export default tableRow;
