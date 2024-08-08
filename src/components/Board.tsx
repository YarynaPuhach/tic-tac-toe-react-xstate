import React from 'react';
import styled from 'styled-components';
import Tile from './Tile';

const StyledBoard = styled.div`
  display: grid;
  height: 50vmin;
  width: 50vmin;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 0.25rem;
  background: #ddd;
  box-shadow: -3vmin 1vmin 6vmin var(--background-shadow);
  transform: rotateX(45deg) rotateZ(-45deg);
  transform-style: preserve-3d;
`;

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