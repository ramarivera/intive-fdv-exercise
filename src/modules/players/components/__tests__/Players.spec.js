import React from 'react';
import { shallow } from 'enzyme';
import ConnectedPlayers, { Players } from '../Players';
import { mockConsoleError, getMockedStore } from '../../../../testUtils';

describe('Players', () => {
  mockConsoleError();

  const buildProps = (except = []) => {
    const mockProps = {
      players: [],
      filter: {
        age: 0,
        name: '',
        position: ''
      },
      playersFetch: jest.fn(),
      playersFilter: jest.fn(),
      playersFilterReset: jest.fn(),
      playersFilterAgeUpdate: jest.fn(),
      playersFilterNameUpdate: jest.fn(),
      playersFilterPositionSelect: jest.fn()
    };

    except.forEach(exceptName => {
      delete mockProps[exceptName];
    });

    return mockProps;
  };

  const getShallowPlayers = (except = []) => {
    return shallow(<Players {...buildProps(except)} />);
  };

  const getPlayersInstance = (except = []) => {
    return getShallowPlayers(except).instance();
  };

  const crashesWithout = propName => {
    it(`crashes without ${propName}`, () => {
      expect(() => {
        getShallowPlayers([propName]);
      }).toThrow();
    });
  };

  it('renders without crashing', () => {
    getShallowPlayers();
  });

  crashesWithout('filter');
  crashesWithout('playersFilter');
  crashesWithout('playersFilterReset');
  crashesWithout('playersFetch');
  crashesWithout('playersFilterAgeUpdate');
  crashesWithout('playersFilterNameUpdate');
  crashesWithout('playersFilterPositionSelect');

  it('renders without crashing with a store', () => {
    const store = getMockedStore();
    shallow(<ConnectedPlayers store={store} />);
  });
});
