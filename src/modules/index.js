import { combineReducers } from 'redux';
import { playersReducer, playersInitialState } from './players';

export const initialState = {
  players: playersInitialState
};

export const rootReducer = combineReducers({ players: playersReducer });
