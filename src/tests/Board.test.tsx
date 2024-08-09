import React from 'react';
import { render } from '@testing-library/react';
import Board from '../components/Board/Board';
import Tile from '../components/Tile/Tile';

describe('Board Component', () => {
  it('renders the correct number of tiles based on board size', () => {
    const board = Array(9).fill(null); // Example for a 3x3 board
    const { getAllByTestId } = render(
      <Board
        board={board}
        onPlay={() => { }}
        size={3}
      />
    );
    const tiles = getAllByTestId(/tile-/);
    expect(tiles).toHaveLength(9);
  });

  it('passes the correct fontSize to each Tile', () => {
    const board = Array(9).fill(null); // Example for a 3x3 board
    const { getByTestId } = render(
      <Board
        board={board}
        onPlay={() => { }}
        size={3}
      />
    );

    const tile = getByTestId('tile-0');
    expect(tile).toHaveStyle('font-size: 10vmin'); // Adjust based on your calculation
  });
});