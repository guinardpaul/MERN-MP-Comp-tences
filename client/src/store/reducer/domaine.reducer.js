import * as actionTypes from '../actions/actionTypes';

const initialState = {
  domaines: [],
  domaine: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_DOMAINE:
      break;

    case actionTypes.GET_ONE_ELEVE:
      break;

    case actionTypes.ADD_DOMAINE:
      break;

    case actionTypes.UPDATE_DOMAINE:
      break;

    case actionTypes.DELETE_DOMAINE:
      break;

    default:
      break;
  }
  return state;
};

export default reducer;
