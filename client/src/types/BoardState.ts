import type { Robot } from './Robot';

export type BoardState = {
  message: string;
  robot: Robot;
  total_steps: number;
  completed_steps: number;
  executing: boolean;
};
