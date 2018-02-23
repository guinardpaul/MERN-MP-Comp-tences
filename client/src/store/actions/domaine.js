import * as actionTypes from './actionTypes';
import * as errorMessages from './errorMessages';
import axios from '../../axios-instance';

// Action creators
const getAllDomaines = listDomaines => {
  return {
    type: actionTypes.GET_ALL_DOMAINE,
    array: listDomaines
  };
};

export const getAllDomainesAsync = () => {
  return dispatch => {
    dispatch(loading());
    axios
      .get('/domaines/')
      .then(res => {
        dispatch(getAllDomaines(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.GET_ALL_DOMAINE,
            errorMessages.GET_ALL_DOMAINES_ERROR
          )
        );
      });
  };
};

const getAllDomainesByCycle = listDomaines => {
  return {
    type: actionTypes.GET_ALL_DOMAINE_BY_CYCLE,
    array: listDomaines
  };
};

export const getAllDomainesByCycleAsync = cycle => {
  return dispatch => {
    dispatch(loading());
    axios
      .get('/domaines/cycle/' + cycle)
      .then(res => {
        dispatch(getAllDomainesByCycle(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.GET_ALL_DOMAINE_BY_CYCLE,
            errorMessages.GET_ALL_DOMAINES_BY_CYCLE_ERROR
          )
        );
      });
  };
};

const getOneDomaine = domaine => {
  return {
    type: actionTypes.GET_ONE_DOMAINE,
    obj: domaine
  };
};

export const getOneDomaineAsync = id_domaine => {
  return dispatch => {
    dispatch(loading());
    axios
      .get('/domaines/' + id_domaine)
      .then(res => {
        dispatch(getOneDomaine(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.GET_ONE_DOMAINE,
            errorMessages.GET_ONE_DOMAINE_ERROR
          )
        );
      });
  };
};

const addDomaine = domaine => {
  return {
    type: actionTypes.ADD_DOMAINE,
    obj: domaine
  };
};

export const addDomaineAsync = domaine => {
  return dispatch => {
    dispatch(loading());
    axios
      .post('/domaines/', domaine)
      .then(res => {
        dispatch(addDomaine(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.ADD_DOMAINE,
            errorMessages.ADD_DOMAINE_ERROR
          )
        );
      });
  };
};

const updateDomaine = domaine => {
  return {
    type: actionTypes.UPDATE_DOMAINE,
    obj: domaine
  };
};

export const updateDomaineAsync = domaine => {
  return dispatch => {
    dispatch(loading());
    axios
      .put('/domaines/' + domaine._id, domaine)
      .then(res => {
        dispatch(updateDomaine(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.UPDATE_DOMAINE,
            errorMessages.UPDATE_DOMAINE_ERROR
          )
        );
      });
  };
};

const deleteDomaine = id_domaine => {
  return {
    type: actionTypes.DELETE_DOMAINE,
    id: id_domaine
  };
};

export const deleteDomaineAsync = id_domaine => {
  return dispatch => {
    dispatch(loading());
    axios
      .get('/domaines/' + id_domaine)
      .then(res => {
        dispatch(deleteDomaine(id_domaine));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.DELETE_DOMAINE,
            errorMessages.DELETE_DOMAINE_ERROR
          )
        );
      });
  };
};

const loading = () => {
  return {
    type: actionTypes.LOADING_DOMAINE
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
    type: actionTypes.ERROR_HANDLER_DOMAINE,
    error: {
      err: error,
      action: action,
      message: errMessage
    }
  };
};
