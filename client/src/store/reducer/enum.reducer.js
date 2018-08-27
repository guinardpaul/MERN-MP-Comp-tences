import * as actionTypes from '../actions/actionTypes';
import * as utils from './utils';

const initialState = {
  enumCycles: [],
  enumTrimestres: [],
  enumResultats: [],
  error: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ENUM_CYCLES:
      return {
        ...state,
        enumCycles: action.array
      }

    case actionTypes.GET_ENUM_TRIMESTRES:
      return {
        ...state,
        enumTrimestres: action.array
      }

    case actionTypes.GET_ENUM_RESULTATS:
      return {
        ...state,
        enumResultats: action.array
      }

    case actionTypes.ERROR_HANDLER_ENUMS:
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