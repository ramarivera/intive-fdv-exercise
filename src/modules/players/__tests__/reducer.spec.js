import {
  playersReducer as reducer,
  playersInitialState as initialState
} from '../reducer';
import { PLAYERS_POSITIONS } from '../constants';
import * as types from '../actionTypes';
import {
  mockConsoleError,
  getMockPlayersData,
  getMockPlayers
} from '../../../testUtils';

describe('Reducer', () => {
  mockConsoleError();

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update filter name', () => {
    const name = 'Messi';
    const action = {
      type: types.PLAYERS_FILTER_NAME_UPDATE,
      name
    };
    const expectedState = {
      ...initialState,
      filter: {
        ...initialState.filter,
        name
      }
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should update filter age', () => {
    const age = 25;
    const action = {
      type: types.PLAYERS_FILTER_AGE_UPDATE,
      age
    };
    const expectedState = {
      ...initialState,
      filter: {
        ...initialState.filter,
        age
      }
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should update filter position', () => {
    const position = PLAYERS_POSITIONS[5];
    const action = {
      type: types.PLAYERS_FILTER_POSITION_SELECT,
      position
    };
    const expectedState = {
      ...initialState,
      filter: {
        ...initialState.filter,
        position
      }
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should start fetching players', () => {
    const loading = true;
    const action = {
      type: types.PLAYERS_FETCH
    };
    const expectedState = {
      ...initialState,
      loading
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should reset filter', () => {
    const filteredPlayersIds = ['messi', 'ronaldo'];
    const action = {
      type: types.PLAYERS_FILTER_RESET
    };
    const expectedState = {
      ...initialState,
      filteredPlayersIds,
      playersIds: filteredPlayersIds
    };

    expect(
      reducer({ ...initialState, playersIds: filteredPlayersIds }, action)
    ).toEqual(expectedState);
  });

  it('should filter players', () => {
    const age = 25;
    const players = getMockPlayers();
    const filteredPlayersIds = players
      .filter(x => x.age === age)
      .map(x => x.id);

    const action = {
      type: types.PLAYERS_FILTER
    };
    const state = {
      ...initialState,
      players,
      playersIds: players.map(x => x.id),
      filter: {
        ...initialState.filter,
        age
      }
    };
    const expectedState = {
      ...state,
      filteredPlayersIds
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should filter players', () => {
    const loading = false;
    const players = getMockPlayers();
    const playersIds = players.map(x => x.id);

    const action = {
      type: types.PLAYERS_LOAD,
      players
    };
    const expectedState = {
      ...initialState,
      players,
      loading,
      playersIds,
      filteredPlayersIds: playersIds
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
