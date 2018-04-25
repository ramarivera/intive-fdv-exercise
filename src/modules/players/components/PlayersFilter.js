import React from 'react';
import PropTypes from 'prop-types';
import {
  PLAYERS_POSITIONS,
  FILTER_MAX_AGE,
  FILTER_MIN_AGE
} from '../constants';

import {
  Form,
  Col,
  Button,
  ButtonGroup,
  FormControl,
  FormGroup,
  ControlLabel
} from 'react-bootstrap';

export default class PlayersFilter extends React.Component {
  handleNameChange = e => {
    this.props.nameHandler(e.target.value);
  };

  handlePositionChange = e => {
    this.props.positionHandler(e.target.value);
  };

  ageIsValid = age => {
    return age === 0 || (FILTER_MIN_AGE <= age && age <= FILTER_MAX_AGE);
  };

  handleAgeChange = e => {
    const age = parseInt(e.target.value, 10);
    if (this.ageIsValid(age)) {
      this.props.ageHandler(age);
    }
  };

  handleFilterClick = e => {
    this.props.filterHandler();
  };

  handleResetClick = e => {
    this.props.filterReset();
  };

  listPositions = () => {
    return PLAYERS_POSITIONS.map((pos, index) => (
      <option key={index} value={pos}>
        {pos}
      </option>
    ));
  };

  render() {
    const { filter } = this.props;
    return (
      <Form inline>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>{' '}
          <FormControl
            data-qa="player-name-input"
            componentClass="input"
            type="text"
            name="name"
            value={filter.name}
            placeholder="Player name"
            onChange={this.handleNameChange}
          />
        </FormGroup>{' '}
        <FormGroup>
          <ControlLabel>Position</ControlLabel>{' '}
          <FormControl
            data-qa="player-position-input"
            name="position"
            componentClass="select"
            value={filter.position}
            onChange={this.handlePositionChange}
          >
            {this.listPositions()}
          </FormControl>
        </FormGroup>{' '}
        <FormGroup>
          <ControlLabel>Age</ControlLabel>{' '}
          <FormControl
            data-qa="player-age-input"
            componentClass="input"
            type="number"
            min={FILTER_MIN_AGE}
            max={FILTER_MAX_AGE}
            name="age"
            value={filter.age}
            placeholder="Age"
            onChange={this.handleAgeChange}
          />
        </FormGroup>{' '}
        <FormGroup>
          <Col>
            <ButtonGroup>
              <Button
                data-qa="player-filter-submit"
                type="button"
                onClick={this.handleFilterClick}
              >
                Filter
              </Button>{' '}
              <Button
                data-qa="player-filter-reset"
                type="button"
                onClick={this.handleResetClick}
              >
                Reset
              </Button>{' '}
            </ButtonGroup>
          </Col>
        </FormGroup>{' '}
      </Form>
    );
  }
}

PlayersFilter.propTypes = {
  filter: PropTypes.object.isRequired,
  ageHandler: PropTypes.func.isRequired,
  nameHandler: PropTypes.func.isRequired,
  positionHandler: PropTypes.func.isRequired,
  filterReset: PropTypes.func.isRequired,
  filterHandler: PropTypes.func.isRequired
};
