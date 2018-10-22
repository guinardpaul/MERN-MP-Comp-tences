import React from 'react';
import Modal from '../../UI/Modal/Modal';

const confirmDelete = props => {
  return (
    <Modal
      modalClosed={props.cancelConfirmDelete}
      show={props.showConfirmDelete}>
      <div className="panel-group modal-panel">
        <div className="panel panel-danger">
          <div className="panel-heading">Confirmer</div>
          <div className="panel-body">
            <p>Etes-vous sûr de vouloir supprimer "{props.objectName}"</p>
            <button className="btn btn-success" onClick={props.onDelete}>
              Confirmer
            </button>
            <button
              className="btn btn-default"
              onClick={props.cancelConfirmDelete}>
              Annuler
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default confirmDelete;
