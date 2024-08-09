import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Board from '../components/Board'; // Ensure this path is correct

describe('Board Component', () => {
  it('calls the onPlay handler with the correct index when a tile is clicked', () => {
    const onPlay = jest.fn();
    const boardState: Array<'x' | 'o' | null> = Array(9).fill(null); // Initial board state

    render(<Board board={boardState} onPlay={onPlay} />);

    // Find the tile to click (index 2)
    const tileToClick = screen.getByTestId('tile-2');
    fireEvent.click(tileToClick);

    expect(onPlay).toHaveBeenCalledTimes(1);
    expect(onPlay).toHaveBeenCalledWith(2); // Ensure the correct index is passed
  });
});