import React from 'react';
import { StyledTile } from './Tile.styled';

interface TileProps {
  index: number;
  player: 'x' | 'o' | null;
  fontSize: string
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ index, player, onClick, fontSize}) => {
  return (
    <StyledTile
      player={player}
      data-player={player}
      onClick={onClick}
      data-testid={`tile-${index}`}
      fontSize={fontSize}
    />
  );
};

export default Tile;