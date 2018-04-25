import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap';
import PlayersFilter from './PlayersFilter';
import PlayersList from './PlayersList';
import {
  playersFetch,
  playersFilterReset,
  playersFilter,
  playersFilterAgeUpdate,
  playersFilterNameUpdate,
  playersFilterPositionSelect
} from '../actions';

import { getFilter, getFilteredPlayers } from '../selectors';

export class Players extends Component {
  componentDidMount() {
    this.props.playersFetch();
  }

  render() {
    const {
      players,
      filter,
      playersFilter,
      playersFilterReset,
      playersFilterAgeUpdate,
      playersFilterNameUpdate,
      playersFilterPositionSelect
    } = this.props;
    return (
      <div>
        <Grid fluid>
          <Row>
            <h3>Filters:</h3>
          </Row>
          <Row>
            <PlayersFilter
              filter={filter}
              filterHandler={playersFilter}
              filterReset={playersFilterReset}
              nameHandler={playersFilterNameUpdate}
              ageHandler={playersFilterAgeUpdate}
              positionHandler={playersFilterPositionSelect}
            />
          </Row>
        </Grid>
        <Grid fluid>
          <Row>
            <h3>Players List:</h3>
          </Row>
          <Row>
            <PlayersList players={players} />
          </Row>
        </Grid>
      </div>
    );
  }
}

Players.propTypes = {
  players: PropTypes.array,
  filter: PropTypes.object.isRequired,
  playersFetch: PropTypes.func.isRequired,
  playersFilter: PropTypes.func.isRequired,
  playersFilterReset: PropTypes.func.isRequired,
  playersFilterAgeUpdate: PropTypes.func.isRequired,
  playersFilterNameUpdate: PropTypes.func.isRequired,
  playersFilterPositionSelect: PropTypes.func.isRequired
};

Players.defaultProps = {
  players: []
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      playersFetch,
      playersFilter,
      playersFilterReset,
      playersFilterAgeUpdate,
      playersFilterNameUpdate,
      playersFilterPositionSelect
    },
    dispatch
  );

const mapStateToProps = state => ({
  players: getFilteredPlayers(state),
  filter: getFilter(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Players);
