import React from 'react';
import { shallow } from 'enzyme';
import PlayerRow from '../PlayerRow';
import Player from '../../models';
import { mockConsoleError, getMockPlayersData } from '../../../../testUtils';

describe('PlayerRow', () => {
  mockConsoleError();

  const dummyPlayerData = getMockPlayersData()[0];

  const player = new Player(dummyPlayerData);

  it('renders without crashing', () => {
    shallow(<PlayerRow player={player} />);
  });

  it('crashes without Player data', () => {
    expect(() => {
      shallow(<PlayerRow />);
    }).toThrow();
  });

  it('contains 6 cells', () => {
    const playerRow = shallow(<PlayerRow player={player} />);
    expect(playerRow.find('td')).toHaveLength(6);
  });
});
