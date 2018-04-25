import * as types from './actionTypes';
import { filterPlayers } from './logic';
import { PLAYERS_DEFAULT_POSITION } from './constants';

const getDefaultFilter = () => ({
  age: 0,
  position: PLAYERS_DEFAULT_POSITION,
  name: ''
});

export const playersInitialState = {
  loading: true,
  players: [],
  playersIds: [],
  filteredPlayersIds: [],
  filter: getDefaultFilter()
};

export const playersReducer = (state = playersInitialState, action) => {
  switch (action.type) {
    case types.PLAYERS_FILTER:
      const filteredPlayers = filterPlayers(state.players, state.filter);
      return {
        ...state,
        filteredPlayersIds: filteredPlayers.map(x => x.id)
      };

    case types.PLAYERS_FETCH:
      return {
        ...state,
        loading: true
      };

    case types.PLAYERS_FILTER_RESET:
      return {
        ...state,
        filteredPlayersIds: state.playersIds,
        filter: getDefaultFilter()
      };

    case types.PLAYERS_LOAD:
      const players = action.players;
      const playersIds = players.map(x => x.id);
      return {
        ...state,
        players,
        playersIds,
        loading: false,
        filteredPlayersIds: playersIds
      };

    case types.PLAYERS_FILTER_AGE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          age: action.age
        }
      };

    case types.PLAYERS_FILTER_NAME_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          name: action.name
        }
      };

    case types.PLAYERS_FILTER_POSITION_SELECT:
      return {
        ...state,
        filter: {
          ...state.filter,
          position: action.position
        }
      };

    default:
      return state;
  }
};
