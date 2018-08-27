import * as actionTypes from './actionTypes';
import * as errorMessages from './errorMessages';
import axios from '../../axios-instance';

const getAllEvaluations = listEval => {
  return {
    type: actionTypes.GET_ALL_EVALUATIONS,
    array: listEval
  }
}

export const getAllEvaluationsAsync = () => {
  return dispatch => {
    dispatch(loading());
    axios.get('evaluations')
      .then(res => {
        dispatch(getAllEvaluations(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.GET_ALL_EVALUATIONS,
            errorMessages.GET_ALL_EVALUATIONS_ERROR
          )
        );
      });
  }
}

const addEvaluation = evaluation => {
  return {
    type: actionTypes.ADD_EVALUATION,
    obj: evaluation
  }
}

export const addEvaluationAsync = evaluation => {
  return dispatch => {
    dispatch(loading());
    axios.post('evaluations', evaluation)
      .then(res => {
        dispatch(addEvaluation(res.data));
      })
      .catch(err => {
        dispatch(errorHandler(err, actionTypes.ADD_EVALUATION, errorMessages.ADD_EVALUATION_ERROR));
      });
  }
}

const updateEvaluation = evaluation => {
  return {
    type: actionTypes.UPDATE_EVALUATION,
    obj: evaluation
  }
}

export const updateEvaluationAsync = evaluation => {
  return dispatch => {
    dispatch(loading());
    axios.put('evaluations/' + evaluation.id, evaluation)
      .then(res => {
        dispatch(updateEvaluation(res.data));
      })
      .catch(err => {
        dispatch(errorHandler(err, actionTypes.UPDATE_EVALUATION, errorMessages.UPDATE_EVALUATION_ERROR));
      });
  }
}

const deleteEvaluation = id => {
  return {
    type: actionTypes.DELETE_EVALUATION,
    id: id
  }
}

export const deleteEvaluationAsync = id => {
  return dispatch => {
    dispatch(loading());
    axios.delete('evaluations' + id)
      .then(res => {
        dispatch(deleteEvaluation(id));
      })
      .catch(err => {
        dispatch(errorHandler(err, actionTypes.DELETE_EVALUATION, errorMessages.DELETE_EVALUATION_ERROR));
      });
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
    type: actionTypes.ERROR_HANDLER_EVALUATION,
    error: {
      err: error,
      action: action,
      message: errMessage
    }
  };
};

const loading = () => {
  return {
    type: actionTypes.LOADING_EVALUATION
  };
};