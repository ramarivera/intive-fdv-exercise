import { createSelector } from 'reselect';

export const getFilter = state => state.players.filter;
export const getPlayers = state => state.players.players;
export const getFilteredIds = state => state.players.filteredPlayersIds;

export const getFilteredPlayers = createSelector(
  getPlayers,
  getFilteredIds,
  (players, filteredIds) => players.filter(x => filteredIds.includes(x.id))
);
