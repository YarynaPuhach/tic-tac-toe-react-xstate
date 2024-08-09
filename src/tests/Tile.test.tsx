import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tile from '../components/Tile/Tile';

describe('Tile Component', () => {
  it('renders the correct player symbol', () => {
    const { container } = render(<Tile player="x" index={0} onClick={() => { }} fontSize="10vmin" />);
    const tile = container.querySelector('[data-player="x"]');
    expect(tile).toBeInTheDocument();
  });

  it('renders no symbol when the tile is empty', () => {
    const { container } = render(<Tile player={null} index={0} onClick={() => { }} fontSize="10vmin" />);
    const tileX = container.querySelector('[data-player="x"]');
    const tileO = container.querySelector('[data-player="o"]');
    expect(tileX).not.toBeInTheDocument();
    expect(tileO).not.toBeInTheDocument();
  });

  it('applies the correct font size', () => {
    const fontSize = '5vmin';
    const { getByTestId } = render(<Tile player="x" index={0} onClick={() => { }} fontSize={fontSize} />);
    const tile = getByTestId('tile-0');
    expect(tile).toHaveStyle(`font-size: ${fontSize}`);
  });

  it('calls the onClick handler when clicked', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<Tile player="x" index={0} onClick={onClick} fontSize="10vmin" />);
    const tile = getByTestId('tile-0');

    fireEvent.click(tile);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});