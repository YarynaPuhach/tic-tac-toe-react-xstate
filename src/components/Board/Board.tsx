import React from 'react';
import { StyledBoard } from './Board.styled';
import Tile from '../Tile/Tile';

interface BoardProps {
  board: Array<'x' | 'o' | null>;
  onPlay: (index: number) => void;
  size: number;
}

const calculateFontSize = (boardSize: number) => {
  const baseFontSize = 10;

  const fontSize = Math.max(baseFontSize * Math.min(10 / boardSize, 1), 4); // Min font size to ensure readability
  
  return `${fontSize}vmin`;
};

const Board: React.FC<BoardProps> = ({ board, onPlay, size }) => {
   const fontSize = calculateFontSize(board.length);

  return (
    <StyledBoard size={size}>
      {board.map((player, index) => (
        <Tile 
          key={index} 
          index={index} 
          player={player} 
          onClick={() => onPlay(index)} 
          fontSize={fontSize}
        />
      ))}
    </StyledBoard>
  );
};

export default Board;