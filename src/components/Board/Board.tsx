import React from 'react';
import { StyledBoard } from './Board.styled';
import Tile from '../Tile/Tile';

interface BoardProps {
  board: Array<'x' | 'o' | null>;
  onPlay: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onPlay }) => {
  return (
    <StyledBoard>
      {board.map((player, index) => (
        <Tile key={index} index={index} player={player} onClick={() => onPlay(index)} />
      ))}
    </StyledBoard>
  );
};

export default Board;