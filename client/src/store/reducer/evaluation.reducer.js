import * as actionTypes from '../actions/actionTypes';
import * as utils from './utils';

const initialState = {
  listEvaluations: [],
  loading: false,
  error: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_EVALUATIONS:
      return {
        ...state,
        listEvaluations: action.array,
        loading: false
      }

    case actionTypes.ADD_EVALUATION:
      return {
        ...state,
        listEvaluations: utils.AddElemToArray(state.listEvaluations, action.obj),
        loading: false
      }

    case actionTypes.UPDATE_EVALUATION:
      return {
        ...state,
        listEvaluations: utils.updateArray(state.listEvaluations, action.obj),
        loading: false
      }

    case actionTypes.DELETE_EVALUATION:
      return {
        ...state,
        listEvaluations: utils.removeElemToArray(state.listEvaluations, action.id),
        loading: false
      }

    case actionTypes.LOADING_EVALUATION:
      return {
        ...state,
        loading: true
      }

    case actionTypes.ERROR_HANDLER_EVALUATION:
      return {
        ...state,
        error: action.error
      }

    default:
      break;
  }

  return state;
}

export default reducer;