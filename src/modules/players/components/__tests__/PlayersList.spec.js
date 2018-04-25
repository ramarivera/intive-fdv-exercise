import React from 'react';
import { shallow } from 'enzyme';
import PlayersList from '../PlayersList';
import PlayerRow from '../PlayerRow';
import { mockConsoleError, getMockPlayersData } from '../../../../testUtils';

describe('PlayersList', () => {
  mockConsoleError();

  const getShallowList = (players = []) => {
    return shallow(<PlayersList players={players} />);
  };

  it('renders without crashing', () => {
    getShallowList();
  });

  it('contains PlayerRows', () => {
    const players = getMockPlayersData();
    const playerList = getShallowList(players);

    expect(playerList.find(PlayerRow)).toHaveLength(players.length);
  });
});
