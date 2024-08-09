import { createActor } from 'xstate';
import { ticTacToeMachine } from '../ticTacToeMachine';

describe('ticTacToeMachine', () => {
  let actor: any;

  beforeEach(() => {
    actor = createActor(ticTacToeMachine);
    actor.start();
  });

  afterEach(() => {
    actor.stop();
  });

  it('should initialize with default context', () => {
    const state = actor.getSnapshot(); 
    expect(state.context.size).toBe(3);
    expect(state.context.board).toEqual(Array(9).fill(null));
    expect(state.context.moves).toBe(0);
    expect(state.context.player).toBe('x');
    expect(state.context.winner).toBeUndefined();
  });

  it('should start playing when START event is sent', () => {
    actor.send({ type: 'START' });
    const state = actor.getSnapshot();

    expect(state.matches('playing')).toBe(true);
  });

  it('should reset game context on RESET event', () => {
    actor.send({ type: 'PLAY', value: 0 });
    actor.send({ type: 'PLAY', value: 1 });
    actor.send({ type: 'RESET' });

    const state = actor.getSnapshot();
    expect(state.context.board).toEqual(Array(9).fill(null));
    expect(state.context.moves).toBe(0);
    expect(state.context.player).toBe('x');
    expect(state.context.winner).toBeUndefined();
  });

  it('should handle changing board size correctly', () => {
    actor.send({ type: 'SET_SIZE', size: 4 });
    const state = actor.getSnapshot();

    expect(state.context.size).toBe(4);
    expect(state.context.board.length).toBe(16); // 4x4 board
  });
});