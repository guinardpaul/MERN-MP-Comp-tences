import * as actionTypes from './actionTypes';

// Action creators
export const getAllClasses = () => {
  return {
    type: actionTypes.GET_ALL_CLASSES
  };
};

export const getOneClasse = id_classe => {
  return {
    type: actionTypes.GET_ONE_CLASSE,
    id: id_classe
  };
};

export const addClasse = classe => {
  return {
    type: actionTypes.ADD_CLASSE,
    obj: classe
  };
};

export const updateClasse = classe => {
  return {
    type: actionTypes.UPDATE_CLASSE,
    obj: classe
  };
};

export const deleteClasse = id_classe => {
  return {
    type: actionTypes.DELETE_CLASSE,
    id: id_classe
  };
};
