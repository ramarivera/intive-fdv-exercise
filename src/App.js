import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import { Players } from './modules/players/components';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Grid>
        <Col xs={12} md={12}>
          <Players />
        </Col>
      </Grid>
    );
  }
}
