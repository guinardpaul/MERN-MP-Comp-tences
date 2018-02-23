import * as actionTypes from '../actions/actionTypes';
import * as utils from './utils';

const initialState = {
  listClasses: [],
  loading: false,
  classe: {},
  error: {
    err: '',
    action: '',
    message: ''
  }
};

/**
 * Classe reducer
 * @param {*} state state
 * @param {string} action actionTypes
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CLASSES:
      return {
        ...state,
        listClasses: action.array,
        loading: false
      };

    case actionTypes.GET_ONE_CLASSE:
      return {
        ...state,
        classe: action.obj,
        loading: false
      };

    case actionTypes.ADD_CLASSE:
      return {
        ...state,
        listClasses: utils.AddElemToArray(state.listClasses, action.obj),
        loading: false
      };

    case actionTypes.UPDATE_CLASSE:
      return {
        ...state,
        listClasses: utils.updateArray(state.listClasses, action.obj),
        loading: false
      };

    case actionTypes.DELETE_CLASSE:
      return {
        ...state,
        listClasses: utils.removeElemToArray(state.listClasses, action.id),
        loading: false
      };

    case actionTypes.LOADING_CLASSE:
      return {
        ...state,
        loading: true
      };

    case actionTypes.ERROR_HANDLER_CLASSE:
      return {
        ...state,
        error: action.error
      };

    default:
      break;
  }

  return state;
};

export default reducer;
