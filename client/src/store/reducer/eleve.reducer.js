import * as actionTypes from '../actions/actionTypes';

const initialState = {
  eleves: [],
  eleve: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_ELEVES:
      break;

    case actionTypes.GET_ELEVES_BY_CLASSE:
      break;

    case actionTypes.GET_ONE_ELEVE:
      break;

    case actionTypes.ADD_ELEVE:
      break;

    case actionTypes.UPDATE_ELEVE:
      break;

    case actionTypes.DELETE_ELEVE:
      break;

    default:
      break;
  }
  return state;
};

export default reducer;
