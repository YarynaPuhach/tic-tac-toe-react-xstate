import { createMachine, assign } from 'xstate';

type Player = 'x' | 'o';

const context = {
  board: Array(9).fill(null) as Array<Player | null>,
  moves: 0,
  player: 'x' as Player,
  winner: undefined as Player | undefined,
};

export const ticTacToeMachine = createMachine(
  {
    id: 'ticTacToe',
    initial: 'idle',
    context,
    states: {
      idle: {
        on: {
          START: 'playing',
        },
        entry: 'resetGame', // Automatically reset when entering idle state
      },
      playing: {
        always: [
          { target: 'won', guard: 'checkWin' },
          { target: 'draw', guard: 'checkDraw' },
        ],
        on: {
          PLAY: [
            {
              target: 'playing',
              guard: 'isValidMove',
              actions: 'updateBoard',
            },
          ],
          RESET: 'idle', // Reset directly transitions to idle
        },
      },
      won: {
        entry: 'setWinner',
        on: {
          RESET: 'idle', // Reset and transition to idle
        },
      },
      draw: {
        on: {
          RESET: 'idle', // Reset and transition to idle
        },
      },
    },
  },
  {
    actions: {
      updateBoard: assign({
        board: ({ context, event }) => {
          if (event.type === 'PLAY') {
            const updatedBoard = [...context.board];
            updatedBoard[event.value] = context.player;
            return updatedBoard;
          }
          return context.board;
        },
        moves: ({ context }) => context.moves + 1,
        player: ({ context }) => (context.player === 'x' ? 'o' : 'x'),
      }),
      setWinner: assign({
        winner: ({ context }) => (context.player === 'x' ? 'o' : 'x'),
      }),
      resetGame: assign({
        board: () => Array(9).fill(null),
        moves: () => 0,
        player: () => 'x' as Player,
        winner: () => undefined,
      }),
    },
    guards: {
      checkWin: ({ context }) => {
        const { board } = context;
        const winningLines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

        for (let line of winningLines) {
          const xWon = line.every((index) => board[index] === 'x');
          const oWon = line.every((index) => board[index] === 'o');

          if (xWon || oWon) return true;
        }

        return false;
      },
      checkDraw: ({ context }) => context.moves === 9 && !context.winner,
      isValidMove: ({ context, event }) => {
        if (event.type !== 'PLAY') return false;
        return context.board[event.value] === null;
      },
    },
  }
);