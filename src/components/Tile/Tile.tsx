import React from 'react';
import { StyledTile } from './Tile.styled';

interface TileProps {
  index: number;
  player: 'x' | 'o' | null;
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ index, player, onClick }) => {
  return (
    <StyledTile
      player={player}
      data-player={player}
      onClick={() => {
        console.log(`Tile ${index} clicked`);
        onClick();
      }}
      data-testid={`tile-${index}`} // Add data-testid here
    />
  );
};

export default Tile;