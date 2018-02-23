import * as actionTypes from '../actions/actionTypes';
import * as utils from './utils';

const initialState = {
  listEleves: [],
  eleve: {},
  loading: false,
  error: {
    err: '',
    action: '',
    message: ''
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_ELEVES:
      return {
        ...state,
        listEleves: action.array,
        loading: false
      };

    case actionTypes.GET_ELEVES_BY_CLASSE:
      return {
        ...state,
        listEleves: action.array,
        loading: false
      };

    case actionTypes.GET_ONE_ELEVE:
      return { ...state, eleve: action.obj };

    case actionTypes.ADD_ELEVE:
      return {
        ...state,
        listEleves: utils.AddElemToArray(state.listEleves, action.obj),
        loading: false
      };

    case actionTypes.UPDATE_ELEVE:
      return {
        ...state,
        listEleves: utils.updateArray(state.listEleves, action.obj),
        loading: false
      };

    case actionTypes.DELETE_ELEVE:
      return {
        ...state,
        listEleves: utils.removeElemToArray(state.listEleves, action.id),
        loading: false
      };

    case actionTypes.LOADING_ELEVE:
      return { ...state, loading: true };

    case actionTypes.ERROR_HANDLER_ELEVE:
      return { ...state, error: action.error };

    default:
      break;
  }
  return state;
};

export default reducer;
