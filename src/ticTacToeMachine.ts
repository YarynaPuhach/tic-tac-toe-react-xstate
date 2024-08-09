import { createMachine, assign } from 'xstate';

type Player = 'x' | 'o';

const createBoard = (size: number) => Array(size * size).fill(null) as Array<Player | null>;

const context = {
  size: 3, // початковий розмір дошки
  board: createBoard(3),
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
          SET_SIZE: {
            target: 'idle',
            actions: 'setSize',
          },
        },
        
        entry: 'resetGame',
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
          RESET: 'idle',
        },
        entry: () => console.log('Entering playing state'), // Додайте це для перевірки
      },
      won: {
        entry: 'setWinner',
        on: {
          RESET: 'idle',
        },
      },
      draw: {
        on: {
          RESET: 'idle',
        },
      },
    },
  },
  {
    actions: {
      updateBoard: assign({
        board: ({ context, event }) => {
          console.log('Current board state:', context.board);
          console.log('Event value:', event.value);
          if (event.type === 'PLAY') {
            const updatedBoard = [...context.board];
            updatedBoard[event.value] = context.player;
            console.log('Updated board state:', updatedBoard);
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
        board: ({ context }) => {
          const newBoard = createBoard(context.size);
          console.log('Board reset to:', newBoard); // Додайте це для перевірки
          return newBoard;
        },
        moves: () => 0,
        player: () => 'x' as Player,
        winner: () => undefined,
      }),
      setSize: assign({
        size: ({ event }) => event.size,
        board: ({ event }) => createBoard(event.size),
        moves: () => 0,
        player: () => 'x' as Player,
        winner: () => undefined,
      }),
    },
    guards: {
      checkWin: ({ context }) => {
        const { board, size } = context;
        const winningLines = [];

        // Генерація горизонтальних і вертикальних ліній
        for (let i = 0; i < size; i++) {
          const horizontal = [];
          const vertical = [];
          for (let j = 0; j < size; j++) {
            horizontal.push(i * size + j);
            vertical.push(j * size + i);
          }
          winningLines.push(horizontal, vertical);
        }

        // Генерація діагоналей
        const diagonal1 = [];
        const diagonal2 = [];
        for (let i = 0; i < size; i++) {
          diagonal1.push(i * size + i);
          diagonal2.push(i * size + (size - 1 - i));
        }
        winningLines.push(diagonal1, diagonal2);

        for (let line of winningLines) {
          const xWon = line.every((index) => board[index] === 'x');
          const oWon = line.every((index) => board[index] === 'o');

          if (xWon || oWon) return true;
        }

        return false;
      },
      checkDraw: ({ context }) => context.moves === context.size * context.size && !context.winner,
      isValidMove: ({ context, event }) => {
        if (event.type !== 'PLAY') return false;
        const isValid = context.board[event.value] === null;
        console.log('Move valid:', isValid); // Додайте це для перевірки
        return isValid;
      },
    },
  }
);