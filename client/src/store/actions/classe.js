import * as actionTypes from './actionTypes';
import * as errorMessages from './errorMessages';
import axios from '../../axios-instance';

// Action creators
/**
 * Get all classes
 * @param {Classe[]} listClasses liste classes
 */
const getAllClasses = listClasses => {
  return {
    type: actionTypes.GET_ALL_CLASSES,
    array: listClasses
  };
};

/**
 * Get all classes async
 */
export const getAllClassesAsync = () => {
  return dispatch => {
    dispatch(loading());
    axios
      .get('/classes')
      .then(res => {
        dispatch(getAllClasses(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.GET_ALL_CLASSES,
            errorMessages.GET_ALL_CLASSES_ERROR
          )
        );
      });
  };
};

/**
 * Get one classe
 * @param {number} id_classe classe ID
 */
export const getOneClasse = id_classe => {
  return {
    type: actionTypes.GET_ONE_CLASSE,
    id: id_classe
  };
};

/**
 * Add classe
 * @param {Classe} classe classe object
 */
const addClasse = classe => {
  return {
    type: actionTypes.ADD_CLASSE,
    obj: classe
  };
};

/**
 * Add classe async
 * @param {Classe} classe classe object
 */
export const addClasseAsync = classe => {
  return dispatch => {
    dispatch(loading());
    axios
      .post('/classes', classe)
      .then(res => {
        dispatch(addClasse(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.ADD_CLASSE,
            errorMessages.ADD_CLASSE_ERROR
          )
        );
      });
  };
};

/**
 * Update classe
 * @param {Classe} classe classe object
 */
const updateClasse = classe => {
  return {
    type: actionTypes.UPDATE_CLASSE,
    obj: classe
  };
};

/**
 * Update classe async
 * @param {Classe} classe classe object
 */
export const updateClasseAsync = classe => {
  return dispatch => {
    dispatch(loading());
    axios
      .put('/classes/' + classe._id, classe)
      .then(res => {
        dispatch(updateClasse(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.UPDATE_CLASSE,
            errorMessages.UPDATE_CLASSE_ERROR
          )
        );
      });
  };
};

/**
 * Delete classe
 * @param {number} id_classe classe ID
 */
const deleteClasse = id_classe => {
  return {
    type: actionTypes.DELETE_CLASSE,
    id: id_classe
  };
};

/**
 * Delete classe async
 * @param {number} id_classe classe ID
 */
export const deleteClasseAsync = id_classe => {
  return dispatch => {
    dispatch(loading());
    axios
      .delete('/classes/' + id_classe)
      .then(res => {
        dispatch(deleteClasse(id_classe));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.DELETE_CLASSE,
            errorMessages.DELETE_CLASSE_ERROR
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
    type: actionTypes.ERROR_HANDLER_CLASSE,
    error: {
      err: error,
      action: action,
      message: errMessage
    }
  };
};

const loading = () => {
  return {
    type: actionTypes.LOADING_CLASSE
  };
};
