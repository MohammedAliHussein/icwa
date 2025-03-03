import { Robot } from "./robot.js";
import { Directions } from "../shared/directions.js";

export class Game {
  constructor() {
    this.robot = new Robot(4, 0, Directions.NORTH);
    this.valid_place = false;
  }

  generate_sequence(instructions) {
    const sequence = [];
    this.valid_place = false;

    for (const instruction of instructions) {
      switch (instruction[0]) {
        case "MOVE":
          if (!this.valid_place) {
            this.cannot_action_request(sequence);
            continue;
          }

          try {
            this.move_robot();

            sequence.push({
              state: this.robot.get_state(),
              message: "Moving",
            });
          } catch (error) {
            this.handle_sequence_error(error, sequence);
          }

          break;
        case "LEFT":
          if (!this.valid_place) {
            this.cannot_action_request(sequence);
            continue;
          }

          this.robot.rotate_left();

          sequence.push({
            state: this.robot.get_state(),
            message: "Rotating Left",
          });

          break;
        case "RIGHT":
          if (!this.valid_place) {
            this.cannot_action_request(sequence);
            continue;
          }

          this.robot.rotate_right();

          sequence.push({
            state: this.robot.get_state(),
            message: "Rotating Right",
          });

          break;
        case "PLACE":
          try {
            const [column, row, direction] = instruction[1].split(",");

            this.place_robot(parseInt(row), parseInt(column), direction);

            sequence.push({
              state: this.robot.get_state(),
              message: "Placing Robot",
            });

            this.valid_place = true;
          } catch (error) {
            this.handle_sequence_error(error, sequence);
          }

          break;
        case "REPORT":
          sequence.push({
            state: this.robot.get_state(),
            message: `${this.report_position()}`,
          });

          break;
      }
    }

    return sequence;
  }

  place_robot(row, column, direction) {
    if (this.in_range(row) && this.in_range(column)) {
      this.robot.place(Math.abs(row - 4), column, direction);
    } else {
      throw new Error("Cannot Place Out of Bounds!");
    }
  }

  move_robot() {
    const robot_row =
      this.robot.get_row() + this.robot.get_direction().delta[0];
    const robot_col =
      this.robot.get_column() + this.robot.get_direction().delta[1];

    if (this.in_range(robot_row) && this.in_range(robot_col)) {
      this.robot.move();
    } else {
      throw new Error("Cannot Move Out of Bounds!");
    }
  }

  get_robot() {
    return this.robot;
  }

  report_position() {
    return `Reporting (${this.robot.get_column()}, ${Math.abs(
      this.robot.get_row() - 4,
    )}) ${this.robot.get_direction().name}`;
  }

  handle_sequence_error(error, sequence) {
    sequence.push({
      state: this.robot.get_state(),
      message: error.message,
    });
  }

  check_valid_place() {
    return this.valid_place;
  }

  cannot_action_request(sequence) {
    sequence.push({
      state: this.robot.get_state(),
      message: "Yet To Encounter Valid Place Command!",
    });
  }

  in_range(x) {
    return x >= 0 && x <= 4;
  }
}
