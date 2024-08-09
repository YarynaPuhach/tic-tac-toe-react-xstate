import { render, fireEvent, screen } from '@testing-library/react';
import Board from '../components/Board/Board';

describe('Board Component', () => {
  it('calls the onPlay handler with the correct index when a tile is clicked', () => {
    const onPlay = jest.fn();
    const boardState: Array<'x' | 'o' | null> = Array(9).fill(null);
    render(<Board board={boardState} onPlay={onPlay} />);
    const tileToClick = screen.getByTestId('tile-2');
    fireEvent.click(tileToClick);

    expect(onPlay).toHaveBeenCalledTimes(1);
    expect(onPlay).toHaveBeenCalledWith(2);
  });
});