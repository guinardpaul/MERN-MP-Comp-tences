import * as actionTypes from './actionTypes';
import * as errorMessages from './errorMessages';
import axios from '../../axios-instance';

// Action creators
const getAllEleves = listEleves => {
  return {
    type: actionTypes.GET_ALL_ELEVES,
    array: listEleves
  };
};

export const getAllElevesAsync = () => {
  return dispatch => {
    dispatch(loading());
    axios
      .get('eleves')
      .then(res => {
        dispatch(getAllEleves(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.GET_ALL_ELEVES,
            errorMessages.GET_ALL_ELEVES_ERROR
          )
        );
      });
  };
};

const getElevesByClasse = listEleves => {
  return {
    type: actionTypes.GET_ELEVES_BY_CLASSE,
    array: listEleves
  };
};

export const getElevesByClasseAsync = id_classe => {
  return dispatch => {
    dispatch(loading());
    axios
      .get('/eleves/classe/' + id_classe)
      .then(res => {
        dispatch(getElevesByClasse(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.GET_ELEVES_BY_CLASSE,
            errorMessages.GET_ALL_ELEVES_ERROR
          )
        );
      });
  };
};

const getOneEleve = id_eleve => {
  return {
    type: actionTypes.GET_ONE_ELEVE,
    id: id_eleve
  };
};

export const getOneEleveAsync = id_eleve => {
  return dispatch => {
    dispatch(loading());
    axios
      .get('/eleves/' + id_eleve)
      .then(res => {
        dispatch(getOneEleve(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.GET_ONE_ELEVE,
            errorMessages.GET_ONE_ELEVES_ERROR
          )
        );
      });
  };
};

const addEleve = eleve => {
  return {
    type: actionTypes.ADD_ELEVE,
    obj: eleve
  };
};

export const addEleveAsync = eleve => {
  return dispatch => {
    dispatch(loading());
    axios
      .post('/eleves/', eleve)
      .then(res => {
        dispatch(addEleve(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.ADD_ELEVE,
            errorMessages.ADD_ELEVE_ERROR
          )
        );
      });
  };
};

const updateEleve = eleve => {
  return {
    type: actionTypes.UPDATE_ELEVE,
    obj: eleve
  };
};

export const updateEleveAsync = eleve => {
  return dispatch => {
    dispatch(loading());
    axios
      .put('/eleves/' + eleve._id, eleve)
      .then(res => {
        dispatch(updateEleve(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.UPDATE_ELEVE,
            errorMessages.UPDATE_ELEVE_ERROR
          )
        );
      });
  };
};

const deleteEleve = id_eleve => {
  return {
    type: actionTypes.DELETE_ELEVE,
    id: id_eleve
  };
};

export const deleteEleveAsync = id_eleve => {
  return dispatch => {
    dispatch(loading());
    axios
      .delete('/eleves/' + id_eleve)
      .then(res => {
        dispatch(deleteEleve(id_eleve));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.DELETE_ELEVE,
            errorMessages.DELETE_ELEVE_ERROR
          )
        );
      });
  };
};

/**
 *
 * @param {Error} error HttpError
 * @param {string} action actionTypes
 * @param {string} errMessage Error message
 */
const errorHandler = (error, action, errMessage) => {
  return {
    type: actionTypes.ERROR_HANDLER_ELEVE,
    error: {
      err: error,
      action: action,
      message: errMessage
    }
  };
};

const loading = () => {
  return {
    type: actionTypes.LOADING_ELEVE
  };
};
