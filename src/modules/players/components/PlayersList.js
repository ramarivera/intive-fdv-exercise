import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import PlayerRow from './PlayerRow';

const PlayersList = props => (
  <Table striped responsive>
    <thead>
      <tr>
        <th>Name</th>
        <th>Position</th>
        <th>Nationality</th>
        <th>J. Number</th>
        <th>Age</th>
        <th>Contract Until</th>
      </tr>
    </thead>
    <tbody>
      {props.players.map((player, index) => (
        <PlayerRow key={index} player={player} />
      ))}
    </tbody>
  </Table>
);

PlayersList.propTypes = {
  players: PropTypes.array
};

PlayersList.defaultProps = {
  players: []
};

export default PlayersList;
