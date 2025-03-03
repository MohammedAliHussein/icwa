import { Directions } from '../shared/directions.js';

export class Robot {
  constructor(row, column, direction) {
    this.row = row;
    this.column = column;
    this.direction = direction;
  }

  place(row, column, direction) {
    this.row = row;
    this.column = column;
    this.direction =
      direction in Directions ? Directions[direction] : Directions.NORTH;
  }

  rotate_left() {
    switch (this.direction.name) {
      case 'North':
        this.direction = Directions.WEST;
        break;
      case 'East':
        this.direction = Directions.NORTH;
        break;
      case 'South':
        this.direction = Directions.EAST;
        break;
      case 'West':
        this.direction = Directions.SOUTH;
        break;
    }
  }

  rotate_right() {
    switch (this.direction.name) {
      case 'North':
        this.direction = Directions.EAST;
        break;
      case 'East':
        this.direction = Directions.SOUTH;
        break;
      case 'South':
        this.direction = Directions.WEST;
        break;
      case 'West':
        this.direction = Directions.NORTH;
        break;
    }
  }

  move() {
    this.row += this.direction.delta[0];
    this.column += this.direction.delta[1];
  }

  get_row() {
    return this.row;
  }

  get_column() {
    return this.column;
  }

  get_direction() {
    return this.direction;
  }

  get_state() {
    return {
      row: this.row,
      column: this.column,
      direction: this.direction.name,
    };
  }
}
