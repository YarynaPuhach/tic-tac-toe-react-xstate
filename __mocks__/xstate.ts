import { createMachine, assign } from 'xstate';

export const interpret = jest.fn().mockImplementation((machine) => {
  return {
    start: jest.fn(),
    stop: jest.fn(),
    send: jest.fn(),
    state: {
      context: machine.context,
      matches: jest.fn((state) => state === 'playing'),
    },
  };
});

export { createMachine, assign };