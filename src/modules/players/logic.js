import axios from 'axios';
import Player from './models';
import { PLAYERS_URL, PLAYERS_DEFAULT_POSITION } from './constants';

export async function getPlayers() {
  let players = await axios.get(PLAYERS_URL);
  return players.data.map(x => new Player(x));
}

function byAge(age) {
  return player => age === 0 || player.age === age;
}

function byName(name) {
  return player => name === '' || player.name.includes(name);
}

function byPosition(position) {
  return player =>
    position === PLAYERS_DEFAULT_POSITION || player.position === position;
}

export function filterPlayers(players, filter) {
  return players
    .filter(byAge(filter.age))
    .filter(byName(filter.name))
    .filter(byPosition(filter.position));
}
