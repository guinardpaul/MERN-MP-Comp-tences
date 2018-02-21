import * as actionTypes from '../actions/actionTypes';

const initialState = {
  competences: [],
  competence: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_COMPETENCES:
      break;

    case actionTypes.GET_ALL_COMPETENCES_BY_DOMAINE:
      break;

    case actionTypes.GET_ONE_COMPETENCE:
      break;

    case actionTypes.ADD_COMPETENCE:
      break;

    case actionTypes.UPDATE_COMPETENCE:
      break;

    case actionTypes.DELETE_COMPETENCE:
      break;

    default:
      break;
  }
  return state;
};

export default reducer;
