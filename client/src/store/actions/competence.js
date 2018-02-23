import * as actionTypes from './actionTypes';
import * as errorMessages from './errorMessages';
import axios from '../../axios-instance';

// Action creators
const getAllCompetences = listCompetences => {
  return {
    type: actionTypes.GET_ALL_COMPETENCES,
    array: listCompetences
  };
};

export const getAllCompetencesAsync = () => {
  return dispatch => {
    dispatch(loading());
    axios
      .get('/competences')
      .then(res => {
        dispatch(getAllCompetences(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.GET_ALL_COMPETENCES,
            errorMessages.GET_ALL_COMPETENCES_ERROR
          )
        );
      });
  };
};

const getAllCompetencesByDomaine = listCompetences => {
  return {
    type: actionTypes.GET_ALL_COMPETENCES_BY_DOMAINE,
    array: listCompetences
  };
};

export const getAllCompetencesByDomaineAsync = id_domaine => {
  return dispatch => {
    dispatch(loading());
    axios
      .get('/competences/domaine' + id_domaine)
      .then(res => {
        dispatch(getAllCompetencesByDomaine(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.GET_ALL_COMPETENCES_BY_DOMAINE,
            errorMessages.GET_ALL_COMPETENCES_BY_DOMAINE_ERROR
          )
        );
      });
  };
};

const getOneCompetence = competence => {
  return {
    type: actionTypes.GET_ONE_COMPETENCE,
    obj: competence
  };
};

export const getOneCompetenceAsync = id_competence => {
  return dispatch => {
    dispatch(loading());
    axios
      .get('/competences/' + id_competence)
      .then(res => {
        dispatch(getOneCompetence(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.GET_ONE_COMPETENCE,
            errorMessages.GET_ONE_COMPETENCE_ERROR
          )
        );
      });
  };
};

const addCompetence = competence => {
  return {
    type: actionTypes.ADD_COMPETENCE,
    obj: competence
  };
};

export const addCompetenceAsync = competence => {
  return dispatch => {
    dispatch(loading());
    axios
      .post('/competences/', competence)
      .then(res => {
        dispatch(addCompetence(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.ADD_COMPETENCE,
            errorMessages.ADD_COMPETENCE_ERROR
          )
        );
      });
  };
};

const updateCompetence = competence => {
  return {
    type: actionTypes.UPDATE_COMPETENCE,
    obj: competence
  };
};

export const updateCompetenceAsync = competence => {
  return dispatch => {
    dispatch(loading());
    axios
      .put('/competences/' + competence._id, competence)
      .then(res => {
        dispatch(updateCompetence(res.data));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.UPDATE_COMPETENCE,
            errorMessages.UPDATE_COMPETENCE_ERROR
          )
        );
      });
  };
};

const deleteCompetence = id_competence => {
  return {
    type: actionTypes.DELETE_COMPETENCE,
    id: id_competence
  };
};

export const deleteCompetenceAsync = id_competence => {
  return dispatch => {
    dispatch(loading());
    axios
      .delete('/competences/' + id_competence)
      .then(res => {
        dispatch(deleteCompetence(id_competence));
      })
      .catch(err => {
        dispatch(
          errorHandler(
            err,
            actionTypes.DELETE_COMPETENCE,
            errorMessages.DELETE_COMPETENCE_ERROR
          )
        );
      });
  };
};

const loading = () => {
  return {
    type: actionTypes.LOADING_COMPETENCE
  };
};

/**
 *
 * @param {Error} error HttpError
 * @param {string} action actionTypes
 * @param {string} errMessage Error message
 */
const errorHandler = (error, action, errMessage) => {
  return {
    type: actionTypes.ERROR_HANDLER_COMPETENCE,
    error: {
      err: error,
      action: action,
      message: errMessage
    }
  };
};
