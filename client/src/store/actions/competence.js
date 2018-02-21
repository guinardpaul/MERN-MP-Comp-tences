import * as actionTypes from './actionTypes';

// Action creators
export const getAllCompetences = () => {
  return {
    type: actionTypes.GET_ALL_COMPETENCES
  };
};

export const getAllCompetencesByDomaine = id_domaine => {
  return {
    type: actionTypes.GET_ALL_COMPETENCES_BY_DOMAINE,
    id: id_domaine
  };
};

export const getOneCompetence = id_competence => {
  return {
    type: actionTypes.GET_ONE_COMPETENCE,
    id: id_competence
  };
};

export const addCompetence = competence => {
  return {
    type: actionTypes.ADD_COMPETENCE,
    obj: competence
  };
};

export const updateCompetence = competence => {
  return {
    type: actionTypes.UPDATE_COMPETENCE,
    obj: competence
  };
};

export const deleteCompetence = id_competence => {
  return {
    type: actionTypes.DELETE_COMPETENCE,
    id: id_competence
  };
};
