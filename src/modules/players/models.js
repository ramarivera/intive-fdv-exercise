import moment from 'moment';

export default class Player {
  constructor(playerPayload) {
    this.name = playerPayload.name;
    this.position = playerPayload.position;
    this.nationality = playerPayload.nationality;
    this.jerseyNumber = playerPayload.jerseyNumber;
    this.contractUntil = new Date(playerPayload.contractUntil);
    this.dateOfBirth = new Date(playerPayload.dateOfBirth);

    this.id = this.name + this.jerseyNumber.toString();
    this.age = moment().diff(moment(this.dateOfBirth), 'years');
  }
}
