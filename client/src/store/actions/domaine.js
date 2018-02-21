import * as actionTypes from './actionTypes';

// Action creators
export const getAllDomaines = () => {
  return {
    type: actionTypes.GET_ALL_DOMAINE
  };
};

export const getOneDomaine = id_domaine => {
  return {
    type: actionTypes.GET_ONE_DOMAINE,
    id: id_domaine
  };
};

export const addDomaine = domaine => {
  return {
    type: actionTypes.ADD_DOMAINE,
    obj: domaine
  };
};

export const updateDomaine = domaine => {
  return {
    type: actionTypes.UPDATE_DOMAINE,
    obj: domaine
  };
};

export const deleteDomaine = id_domaine => {
  return {
    type: actionTypes.DELETE_DOMAINE,
    id: id_domaine
  };
};
