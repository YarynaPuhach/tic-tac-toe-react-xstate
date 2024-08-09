import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { ticTacToeMachine } from '../../ticTacToeMachine';
import Board from '../Board/Board';
import { GameContainer, StatusContainer, ResetButton } from './Game.styled';

const Game: React.FC = () => {
  const [state, send] = useMachine(ticTacToeMachine);
  console.log(state.value);
  const isGameOver = state.matches('won') || state.matches('draw');
  const currentPlayer = state.context.player;
  const winner = state.context.winner;
  useEffect(() => {
    if (state.matches('idle')) {
      send({ type: 'START' });
    }
  }, [state, send]);
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
      <Board board={state.context.board} onPlay={(index) => send({ type: 'PLAY', value: index })} />
      <ResetButton onClick={() => send({ type: 'RESET' })}>Reset</ResetButton>
    </GameContainer>
  );
};

export default Game;