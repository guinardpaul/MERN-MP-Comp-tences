import React from 'react';
import ReactDOM from 'react-dom';
import 'react-bootstrap';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import ClasseReducer from './store/reducer/classe.reducer';
import EleveReducer from './store/reducer/eleve.reducer';
import DomaineReducer from './store/reducer/domaine.reducer';
import CompetenceReducer from './store/reducer/competence.reducer';

const rootReducer = combineReducers({
  classe: ClasseReducer,
  eleve: EleveReducer,
  domaine: DomaineReducer,
  competence: CompetenceReducer
});

const logger = store => {
  return next => {
    return action => {
      // console.log('[Middleware] Dispatching', action);
      const result = next(action);
      console.log('[Middleware] next state', store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
