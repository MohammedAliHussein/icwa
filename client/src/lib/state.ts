import { writable } from 'svelte/store';

import type { BoardState } from '../types/BoardState';

const create_board_state = () => {
  const initialState: BoardState = {
    robot: { column: 0, row: 4, direction: 'North' },
    message: 'Ready To Go!',
    total_steps: 0,
    completed_steps: 0,
    executing: false
  };

  const { subscribe, update } = writable<BoardState>(initialState);

  return {
    subscribe,
    update_robot: (row: number, column: number, direction: string) =>
      update((state: BoardState) => {
        state.robot.row = row;
        state.robot.column = column;
        state.robot.direction = direction;

        return state;
      }),
    update_total_steps: (total_steps: number) =>
      update((state: BoardState) => {
        state.total_steps = total_steps;

        return state;
      }),
    update_message: (message: string) =>
      update((state: BoardState) => {
        state.message = message;

        return state;
      }),
    increment_completed_steps: () =>
      update((state: BoardState) => {
        state.completed_steps = state.completed_steps + 1;

        return state;
      }),
    reset_completed_steps: () =>
      update((state: BoardState) => {
        state.completed_steps = 0;

        return state;
      }),
    set_executing: (value: boolean) =>
      update((state: BoardState) => {
        state.executing = value;

        return state;
      })
  };
};

export const board = create_board_state();
