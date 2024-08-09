import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createActor } from 'xstate';
import { ticTacToeMachine } from '../ticTacToeMachine';
import Game from '../components/Game/Game';

describe('Game Component', () => {
  let actor: any;

  beforeEach(() => {
    actor = createActor(ticTacToeMachine).start();
  });

  afterEach(() => {
    actor.stop();
  });

  it('should initialize with an empty board and player x\'s turn', () => {
    render(<Game />);

    const tiles = screen.getAllByTestId(/^tile-/);
    tiles.forEach(tile => expect(tile.textContent).toBe(''));
    expect(screen.getByText('Player X\'s Turn')).toBeInTheDocument();
  });

  it('should reset the game when RESET event is sent', async () => {
    render(<Game />);

    actor.send({ type: 'PLAY', value: 0 });
    actor.send({ type: 'PLAY', value: 1 });

    actor.send({ type: 'RESET' });

    await waitFor(() => {
      const tiles = screen.getAllByTestId(/^tile-/);
      tiles.forEach(tile => expect(tile.textContent).toBe(''));
      expect(screen.getByText('Player X\'s Turn')).toBeInTheDocument();
    });
  });
});