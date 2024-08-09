import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { interpret } from 'xstate';
import { ticTacToeMachine } from '../ticTacToeMachine';
import Game from '../components/Game/Game';

describe('Game Component', () => {
  let service: any;

  beforeEach(() => {
    // Create and start a new instance of the machine for each test
    service = interpret(ticTacToeMachine).start();
  });

  afterEach(() => {
    service.stop();
  });

  it('should initialize with an empty board and player x\'s turn', () => {
    render(<Game />);

    // Check that the initial state is correct
    const tiles = screen.getAllByTestId(/^tile-/);
    tiles.forEach(tile => expect(tile.textContent).toBe(''));
    expect(screen.getByText('Player X\'s Turn')).toBeInTheDocument();
  });

  it('should reset the game when RESET event is sent', async () => {
    // Render the component once
    render(<Game />);

    // Simulate some moves
    service.send({ type: 'PLAY', value: 0 });
    service.send({ type: 'PLAY', value: 1 });

    // Trigger the reset action
    service.send({ type: 'RESET' });

    await waitFor(() => {
      const tiles = screen.getAllByTestId(/^tile-/);
      tiles.forEach(tile => expect(tile.textContent).toBe(''));
      expect(screen.getByText('Player X\'s Turn')).toBeInTheDocument();
    });
  });

  it('should change board size when a new size is selected', async () => {
    render(<Game />);

    // Change the field size
    fireEvent.change(screen.getByLabelText('Change field size:'), { target: { value: 4 } });
    service.send({ type: 'SET_SIZE', size: '4' });

    // Wait for the board to update to reflect the new size
    await waitFor(() => {
      const tiles = screen.getAllByTestId(/^tile-/);
      expect(tiles.length).toBe(16); // 4x4 board should have 16 tiles
      expect(screen.getByLabelText('Change field size:')).toHaveValue(4);
    });
  });
});