import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

// Action creators
const getAllClasses = listClasses => {
  return {
    type: actionTypes.GET_ALL_CLASSES,
    array: listClasses
  };
};

export const getAllClassesAsync = () => {
  return dispatch => {
    axios
      .get('/classes')
      .then(res => {
        dispatch(getAllClasses(res.data));
      })
      .catch(err => {
        console.log('err: ', err);
      });
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
