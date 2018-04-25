import React from 'react';
import { shallow } from 'enzyme';
import PlayersFilter from '../PlayersFilter';
import { PLAYERS_POSITIONS } from '../../constants';
import { mockConsoleError, getMockPlayersData } from '../../../../testUtils';

describe('PlayersFilter', () => {
  mockConsoleError();

  const buildProps = (except = []) => {
    const mockProps = {
      filter: {
        age: 0,
        name: '',
        position: ''
      },
      ageHandler: jest.fn(),
      nameHandler: jest.fn(),
      positionHandler: jest.fn(),
      filterHandler: jest.fn(),
      filterReset: jest.fn()
    };

    except.forEach(exceptName => {
      delete mockProps[exceptName];
    });

    return mockProps;
  };

  const getShallowFilter = (except = []) => {
    return shallow(<PlayersFilter {...buildProps(except)} />);
  };

  const getFilterInstance = (except = []) => {
    return getShallowFilter(except).instance();
  };

  const crashesWithout = propName => {
    it(`crashes without ${propName}`, () => {
      expect(() => {
        getShallowFilter([propName]);
      }).toThrow();
    });
  };

  it('renders without crashing', () => {
    getShallowFilter();
  });

  crashesWithout('filter');
  crashesWithout('ageHandler');
  crashesWithout('positionHandler');
  crashesWithout('nameHandler');
  crashesWithout('filterHandler');
  crashesWithout('filterReset');

  describe('validates age', () => {
    const validatesAge = (age, expected) => {
      it(`validates ${age}`, () => {
        expect(getFilterInstance().ageIsValid(age)).toBe(expected);
      });
    };

    validatesAge(0, true);
    validatesAge(17.99, false);
    validatesAge(18, true);
    validatesAge(35, true);
    validatesAge(40, true);
    validatesAge(42, false);
    validatesAge(50, false);
  });

  describe('lists player positions', () => {
    it('lists all positions', () => {
      const instance = getFilterInstance();
      expect(instance.listPositions()).toHaveLength(PLAYERS_POSITIONS.length);
    });

    it('lists positions as options', () => {
      const wrapper = getShallowFilter();
      expect(wrapper.find('option')).toHaveLength(PLAYERS_POSITIONS.length);
    });
  });

  describe('handles events', () => {
    const buildEventObject = value => ({
      target: {
        value
      }
    });

    const handlesEvent = (
      changedName,
      qaId,
      eventValue,
      eventHandlerName,
      eventName = 'change',
      expectedCalls = 1
    ) => {
      it(`handles ${changedName}`, () => {
        const filter = getShallowFilter();
        const input = filter.find(`[data-qa="${qaId}"]`);
        const getMockFn = () => {
          return filter.instance().props[eventHandlerName].mock;
        };

        input.simulate(eventName, buildEventObject(eventValue));
        expect(getMockFn().calls.length).toBe(expectedCalls);
      });
    };

    handlesEvent('name changes', 'player-name-input', 'messi', 'nameHandler');
    handlesEvent('age changes', 'player-age-input', 25, 'ageHandler');
    handlesEvent(
      'age changes (invalid)',
      'player-age-input',
      17,
      'ageHandler',
      'change',
      0
    );

    handlesEvent(
      'position changes',
      'player-position-input',
      'Keeper',
      'positionHandler'
    );

    handlesEvent(
      'submit filter clicks',
      'player-filter-submit',
      null,
      'filterHandler',
      'click'
    );

    handlesEvent(
      'submit filter reset',
      'player-filter-reset',
      null,
      'filterReset',
      'click'
    );
  });
});
