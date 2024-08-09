import { createActor } from 'xstate';
import { ticTacToeMachine } from '../ticTacToeMachine'; // Adjust the import path as needed

describe('ticTacToeMachine Logic', () => {
  let service: any;

  beforeEach(() => {
    service = createActor(ticTacToeMachine);
    service.start();
  });

  afterEach(() => {
    service.stop();
  });

  it('should initialize with the correct context', async () => {
    const state = await service.getSnapshot();
    expect(state.context).toEqual({
      board: Array(9).fill(null),
      moves: 0,
      player: 'x',
      winner: undefined
    });
  });

  it('should update the board when a PLAY event is sent', async () => {
    service.send({ type: 'PLAY', value: 0 });
    const state = await service.getSnapshot();
    expect(state.context.board[0]).toBe('x');
    expect(state.context.moves).toBe(1);
    expect(state.context.player).toBe('o');
  });

  it('should not allow invalid moves', async () => {
    service.send({ type: 'PLAY', value: 0 });
    service.send({ type: 'PLAY', value: 0 }); // Invalid move
    const state = await service.getSnapshot();
    expect(state.context.board[0]).toBe('x'); // Board should not change
  });

  it('should detect a win condition', async () => {
    service.send({ type: 'PLAY', value: 0 });
    service.send({ type: 'PLAY', value: 1 });
    service.send({ type: 'PLAY', value: 3 });
    service.send({ type: 'PLAY', value: 4 });
    service.send({ type: 'PLAY', value: 6 }); // Player 'x' wins
    const state = await service.getSnapshot();
    expect(state.matches('gameOver.winner')).toBe(true);
    expect(state.context.winner).toBe('x');
  });

  it('should reset the game when RESET event is sent', async () => {
    service.send({ type: 'PLAY', value: 0 });
    service.send({ type: 'PLAY', value: 1 });
    service.send({ type: 'RESET' });
    const state = await service.getSnapshot();
    expect(state.context).toEqual({
      board: Array(9).fill(null),
      moves: 0,
      player: 'x',
      winner: undefined
    });
  });
});