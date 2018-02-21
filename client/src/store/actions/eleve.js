import * as actionTypes from './actionTypes';

// Action creators
export const getAllEleves = () => {
  return {
    type: actionTypes.GET_ALL_ELEVES
  };
};

export const getElevesByClasse = id_classe => {
  return {
    type: actionTypes.GET_ELEVES_BY_CLASSE,
    id: id_classe
  };
};

export const getOneEleve = id_eleve => {
  return {
    type: actionTypes.GET_ONE_ELEVE,
    id: id_eleve
  };
};

export const addEleve = eleve => {
  return {
    type: actionTypes.ADD_ELEVE,
    obj: eleve
  };
};

export const updateEleve = eleve => {
  return {
    type: actionTypes.UPDATE_ELEVE,
    obj: eleve
  };
};

export const deleteEleve = id_eleve => {
  return {
    type: actionTypes.DELETE_ELEVE,
    id: id_eleve
  };
};
