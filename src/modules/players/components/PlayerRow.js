import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const PlayerRow = props => {
  const player = props.player;
  return (
    <tr>
      <td>{player.name}</td>
      <td>{player.position}</td>
      <td>{player.nationality}</td>
      <td>{player.jerseyNumber}</td>
      <td>{player.age}</td>
      <td>{moment(player.contractUntil).format('MMMM Do YYYY')}</td>
    </tr>
  );
};

PlayerRow.propTypes = {
  player: PropTypes.object.isRequired
};

export default PlayerRow;
