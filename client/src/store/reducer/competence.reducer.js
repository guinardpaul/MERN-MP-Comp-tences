import * as actionTypes from '../actions/actionTypes';
import * as utils from './utils';

const initialState = {
  listCompetences: [],
  competence: {},
  loading: false,
  error: {
    err: '',
    action: '',
    message: ''
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_COMPETENCES:
      return {
        ...state,
        listCompetences: action.array,
        loading: false
      };

    case actionTypes.GET_ALL_COMPETENCES_BY_DOMAINE:
      return {
        ...state,
        listCompetences: action.array,
        loading: false
      };

    case actionTypes.GET_ONE_COMPETENCE:
      return {
        ...state,
        competence: action.obj,
        loading: false
      };

    case actionTypes.ADD_COMPETENCE:
      return {
        ...state,
        listCompetences: utils.AddElemToArray(
          state.listCompetences,
          action.obj
        ),
        loading: false
      };

    case actionTypes.UPDATE_COMPETENCE:
      return {
        ...state,
        listCompetences: utils.updateArray(state.listCompetences, action.obj),
        loading: false
      };

    case actionTypes.DELETE_COMPETENCE:
      return {
        ...state,
        listCompetences: utils.removeElemToArray(
          state.listCompetences,
          action.id
        ),
        loading: false
      };

    case actionTypes.LOADING_COMPETENCE:
      return {
        ...state,
        loading: true
      };

    case actionTypes.ERROR_HANDLER_COMPETENCE:
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
