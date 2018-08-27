import * as actionTypes from './actionTypes';
import * as errorMessages from './errorMessages';
import axios from '../../axios-instance';

// Action creators
const getEnumTrimestres = res => {
  return {
    type: actionTypes.GET_ENUM_TRIMESTRES,
    array: res
  }
}

export const getEnumTrimestresAsync = () => {
  return dispatch => {
    axios.get('enums/trimestres')
      .then(res => {
        dispatch(getEnumTrimestres(res.data))
      })
      .catch(err => {
        dispatch(errorHandler(err, actionTypes.GET_ENUM_TRIMESTRES, errorMessages.GET_ENUM_TRIMESTRES_ERROR))
      })
  }
}

const getEnumCycles = res => {
  return {
    type: actionTypes.GET_ENUM_CYCLES,
    array: res
  }
}

export const getEnumCyclesAsync = () => {
  return dispatch => {
    axios.get('enums/cycles')
      .then(res => {
        dispatch(getEnumCycles(res.data))
      })
      .catch(err => {
        dispatch(errorHandler(err, actionTypes.GET_ENUM_CYCLES, errorMessages.GET_ENUM_CYCLES_ERROR));
      });
  }
}

const getEnumResultats = res => {
  return {
    type: actionTypes.GET_ENUM_RESULTATS,
    array: res
  }
}

export const getEnumResultatsAsync = () => {
  return dispatch => {
    axios.get('enums/resultats')
      .then(res => {
        dispatch(getEnumResultats(res.data));
      })
      .catch(err => {
        errorHandler(err, actionTypes.GET_ENUM_RESULTATS, errorMessages.GET_ENUM_RESULTATS_ERROR)
      })
  }
}

/**
 *
 * @param {Error} error HttpError
 * @param {string} action actionTypes
 * @param {string} errMessage Error message
 */
const errorHandler = (error, action, errMessage) => {
  return {
    type: actionTypes.ERROR_HANDLER_ENUMS,
    error: {
      err: error,
      action: action,
      message: errMessage
    }
  };
};