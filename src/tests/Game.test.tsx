import { render, screen, fireEvent } from '@testing-library/react';
import { createActor } from 'xstate';
import { ticTacToeMachine } from '../ticTacToeMachine';
import Game from '../components/Game';

describe('Game Component', () => {
  let actor: any;

  beforeEach(() => {
    actor = createActor(ticTacToeMachine);
    actor.start();
  });

  afterEach(() => {
    actor.stop();
  });

  it('should initialize with an empty board and player x\'s turn', () => {
    render(<Game />);

    const state = actor.getSnapshot();
    const board = state.context.board;

    const tiles = screen.getAllByTestId(/^tile-/);
    tiles.forEach(tile => expect(tile.textContent).toBe(''));
    expect(screen.getByText('Player X\'s Turn')).toBeInTheDocument();
  });

  it('should reset the game when RESET event is sent', () => {

    actor.send({ type: 'PLAY', value: 0 });
    actor.send({ type: 'PLAY', value: 1 });
    actor.send({ type: 'RESET' });

    render(<Game />);

    const tiles = screen.getAllByTestId(/^tile-/);
    tiles.forEach(tile => expect(tile.textContent).toBe(''));
    expect(screen.getByText('Player X\'s Turn')).toBeInTheDocument();
  });
});