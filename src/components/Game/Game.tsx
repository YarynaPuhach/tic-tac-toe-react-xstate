import React from 'react';
import { useMachine } from '@xstate/react';
import { ticTacToeMachine } from '../../ticTacToeMachine';
import Board from '../Board/Board';
import { GameContainer, StatusContainer, ResetButton } from './Game.styled';

const Game: React.FC = () => {
  const [state, send] = useMachine(ticTacToeMachine);

  const isGameOver = state.matches('gameOver');
  const currentPlayer = state.context.player;
  const winner = state.context.winner;

  return (
    <GameContainer>
      <h1>Tic-Tac-Toe</h1>
      <StatusContainer isGameOver={isGameOver}>
        {isGameOver ? (
          <>
            {state.hasTag('winner') && <div>Winner: {winner}</div>}
            {state.hasTag('draw') && <div>Draw</div>}
          </>
        ) : (
          <div>
            {currentPlayer === 'x' && <span>Player X's Turn</span>}
            {currentPlayer === 'o' && <span>Player O's Turn</span>}
          </div>
        )}
      </StatusContainer>
      <Board board={state.context.board} onPlay={(index) => send({ type: 'PLAY', value: index })} />
      <ResetButton onClick={() => send({ type: 'RESET' })}>Reset</ResetButton>
    </GameContainer>
  );
};

export default Game;