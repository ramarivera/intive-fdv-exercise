import moxios from 'moxios';
import { getPlayers, filterPlayers } from '../logic';
import { PLAYERS_POSITIONS, PLAYERS_DEFAULT_POSITION } from '../constants';
import {
  mockConsoleError,
  getMockPlayersData,
  getMockPlayers,
  mockAxios
} from '../../../testUtils';

describe('Logic', () => {
  mockConsoleError();

  describe('Players Fetching', () => {
    mockAxios();

    it('should return a list of players', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: getMockPlayersData()
        });
      });

      const players = await getPlayers();

      expect(players).toEqual(getMockPlayers());
    });
  });

  describe('Players Filtering', () => {
    const buildFilter = (overrides = {}) => ({
      name: '',
      age: 0,
      position: PLAYERS_DEFAULT_POSITION,
      ...overrides
    });

    it('should not filter with default filter', () => {
      const filter = buildFilter();
      const players = getMockPlayers();
      const expected = getMockPlayers();

      expect(filterPlayers(players, filter)).toEqual(expected);
    });

    it('should filter by age', () => {
      const age = 32;
      const filter = buildFilter({ age });
      const players = getMockPlayers();
      const expected = players.filter(x => x.age === age);

      expect(filterPlayers(players, filter)).toEqual(expected);
    });

    it('should filter by position', () => {
      const position = PLAYERS_POSITIONS[5];
      const filter = buildFilter({ position });
      const players = getMockPlayers();
      const expected = players.filter(x => x.position === position);

      expect(filterPlayers(players, filter)).toEqual(expected);
    });

    it('should by name containing string', () => {
      const name = 'Messi';
      const filter = buildFilter({ name });
      const players = getMockPlayers();
      const expected = players.filter(x => x.name.includes(name));

      expect(filterPlayers(players, filter)).toEqual(expected);
    });
  });
});
