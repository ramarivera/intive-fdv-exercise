import moxios from 'moxios';
import * as actions from '../actions';
import * as types from '../actionTypes';
import {
  mockConsoleError,
  getMockPlayersData,
  getMockPlayers,
  getMockedStore,
  mockAxios
} from '../../../testUtils';

describe('Actions', () => {
  mockConsoleError();

  describe('Normal Actions', () => {
    it('should create an action to load players', () => {
      const players = getMockPlayersData();
      const expectedAction = {
        type: types.PLAYERS_LOAD,
        players
      };
      expect(actions.playersLoad(players)).toEqual(expectedAction);
    });

    it('should create an action to filter players', () => {
      const expectedAction = {
        type: types.PLAYERS_FILTER
      };
      expect(actions.playersFilter()).toEqual(expectedAction);
    });

    it('should create an action to reset applied filter', () => {
      const expectedAction = {
        type: types.PLAYERS_FILTER_RESET
      };
      expect(actions.playersFilterReset()).toEqual(expectedAction);
    });

    it('should create an action to update the filter age', () => {
      const age = 25;
      const expectedAction = {
        type: types.PLAYERS_FILTER_AGE_UPDATE,
        age
      };
      expect(actions.playersFilterAgeUpdate(age)).toEqual(expectedAction);
    });

    it('should create an action to update the filter name', () => {
      const name = 'Messi';
      const expectedAction = {
        type: types.PLAYERS_FILTER_NAME_UPDATE,
        name
      };
      expect(actions.playersFilterNameUpdate(name)).toEqual(expectedAction);
    });

    it('should create an action to update the filter position', () => {
      const position = 'Attacking Midfield';
      const expectedAction = {
        type: types.PLAYERS_FILTER_POSITION_SELECT,
        position
      };
      expect(actions.playersFilterPositionSelect(position)).toEqual(
        expectedAction
      );
    });
  });

  describe('Async Actions', () => {
    mockAxios();

    it('should create an action to fetch players', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: getMockPlayersData()
        });
      });

      const expectedActions = [
        { type: types.PLAYERS_FILTER_RESET },
        { type: types.PLAYERS_LOAD, players: getMockPlayers() }
      ];

      const store = getMockedStore();

      return store.dispatch(actions.playersFetch()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
