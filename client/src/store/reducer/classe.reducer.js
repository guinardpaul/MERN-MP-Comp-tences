import * as actionTypes from '../actions/actionTypes';

const initialState = {
  listClasses: [],
  classe: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CLASSES:
      return {
        ...state,
        listClasses: action.array
      };

    case actionTypes.GET_ONE_CLASSE:
      break;

    case actionTypes.ADD_CLASSE:
      break;

    case actionTypes.UPDATE_CLASSE:
      break;

    case actionTypes.DELETE_CLASSE:
      break;

    default:
      break;
  }
  return state;
};

export default reducer;
