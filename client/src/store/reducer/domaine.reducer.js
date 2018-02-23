import * as actionTypes from '../actions/actionTypes';
import * as utils from './utils';

const initialState = {
  listDomaines: [],
  domaine: {},
  loading: false,
  error: {
    err: '',
    action: '',
    message: ''
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_DOMAINE:
      return {
        ...state,
        listDomaines: action.array,
        loading: false
      };

    case actionTypes.GET_ALL_DOMAINE_BY_CYCLE:
      return {
        ...state,
        listDomaines: action.array,
        loading: false
      };

    case actionTypes.GET_ONE_ELEVE:
      return {
        ...state,
        domaine: action.obj,
        loading: false
      };

    case actionTypes.ADD_DOMAINE:
      return {
        ...state,
        listDomaines: utils.AddElemToArray(state.listDomaines, action.obj),
        loading: false
      };

    case actionTypes.UPDATE_DOMAINE:
      return {
        ...state,
        listDomaines: utils.updateArray(state.listDomaines, action.obj),
        loading: false
      };

    case actionTypes.DELETE_DOMAINE:
      return {
        ...state,
        listDomaines: utils.removeElemToArray(state.listDomaines, action.obj),
        loading: false
      };

    case actionTypes.LOADING_DOMAINE:
      return {
        ...state,
        loading: true
      };

    case actionTypes.ERROR_HANDLER_DOMAINE:
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
