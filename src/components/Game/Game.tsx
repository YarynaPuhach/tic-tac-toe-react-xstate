import React, { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import { ticTacToeMachine } from '../../ticTacToeMachine';
import Board from '../Board/Board';
import { GameContainer, StatusContainer, ResetButton, ChangeSizeContainer } from './Game.styled';

const Game: React.FC = () => {
  const [state, send] = useMachine(ticTacToeMachine);
  const [size, setSize] = useState(state.context.size);
  
  const isGameOver = state.matches('won') || state.matches('draw');
  const currentPlayer = state.context.player;
  const winner = state.context.winner;

  useEffect(() => {
    send({ type: 'RESET' });
    send({ type: 'SET_SIZE', size });
    
    send({ type: 'START' });
  }, [size, send]);

  const handlePlay = (index: number) => {
    console.log('Play action triggered with index:', index);
    send({ type: 'PLAY', value: index });
    console.log('State after play action:', state.context); // Перевірте, що стан змінюється
  };


  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    if (newSize >= 3) {
      setSize(newSize);

    }
  };

  return (
    <GameContainer>
      <h1>Tic-Tac-Toe</h1>
      <StatusContainer isGameOver={isGameOver}>
        {state.matches('won') ? (
          <div>Winner: {winner}</div>
        ) : state.matches('draw') ? (
          <div>Draw</div>
        ) : (
          <div>Player {currentPlayer.toUpperCase()}'s Turn</div>
        )}
      </StatusContainer>
      <Board
        board={state.context.board}
        onPlay={handlePlay}
        size={size}

      />
      <ResetButton onClick={() => {
        send({ type: 'RESET' });
        send({ type: 'START' });
      }}>Reset</ResetButton>
      <ChangeSizeContainer>
        <h2>Want to try something harder?</h2>
        <label>
          Change field size:
          <input
            type="number"
            value={size}
            onChange={handleSizeChange}
            min="3"
            max="10"
          />
        </label>
      </ChangeSizeContainer>
    </GameContainer>
  );
};

export default Game;