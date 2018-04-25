import * as types from './actionTypes';
import { getPlayers } from './logic';

const actionBuilder = (type, payload) => {
  if (!payload) {
    return { type };
  }
  return {
    type,
    ...payload
  };
};

export function playersFetch() {
  return async (dispatch, getState) => {
    const players = await getPlayers();
    dispatch(playersFilterReset());
    dispatch(playersLoad(players));
  };
}

export function playersLoad(players) {
  return actionBuilder(types.PLAYERS_LOAD, { players });
}

export function playersFilter() {
  return actionBuilder(types.PLAYERS_FILTER);
}

export function playersFilterReset() {
  return actionBuilder(types.PLAYERS_FILTER_RESET);
}

export function playersFilterPositionSelect(position) {
  return actionBuilder(types.PLAYERS_FILTER_POSITION_SELECT, { position });
}

export function playersFilterNameUpdate(name) {
  return actionBuilder(types.PLAYERS_FILTER_NAME_UPDATE, { name });
}

export function playersFilterAgeUpdate(age) {
  return actionBuilder(types.PLAYERS_FILTER_AGE_UPDATE, { age });
}
