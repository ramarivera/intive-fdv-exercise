import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { initialState, rootReducer } from './modules';

const middleware = [thunk];

const enchancers = compose(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, enchancers);

export default store;
