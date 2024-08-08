import React from 'react';
import { useMachine } from '@xstate/react';
import styled, { keyframes, css } from 'styled-components';
import { ticTacToeMachine } from '../ticTacToeMachine';
import Board from '../components/Board';

const GameContainer = styled.div`
  text-align: center;
  position: relative; /* To ensure relative positioning of elements */
`;

const glowingBorder = keyframes`
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
`;

const StatusContainer = styled.div<{ isGameOver: boolean }>`
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  min-height: 2em;
  position: relative;
  padding: 0.6em 2em;
  border-radius: 10px;
  ${props => props.isGameOver && css`
    &:before {
      content: "";
      background: linear-gradient(
        45deg,
        #ff0000,
        #ff7300,
        #fffb00,
        #48ff00,
        #00ffd5,
        #002bff,
        #7a00ff,
        #ff00c8,
        #ff0000
      );
      position: absolute;
      top: -2px;
      left: -2px;
      background-size: 400%;
      z-index: -2; /* Ensure it's behind other elements */
      filter: blur(5px);
      -webkit-filter: blur(5px);
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      animation: ${glowingBorder} 20s linear infinite;
      transition: opacity 0.3s ease-in-out;
      border-radius: 10px;
    }

    &:after {
      z-index: -1; /* Ensure it's behind the text but above the before pseudo-element */
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: #939393;
      left: 0;
      top: 0;
      border-radius: 10px;
    }
  `}
`;

const glowingButton85 = keyframes`
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
`;

const ResetButton = styled.button`
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-top: 20px;
  font-size: 1rem;

  &:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -2; /* Changed to -2 to ensure it's behind other elements */
    filter: blur(5px);
    -webkit-filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: ${glowingButton85} 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }

  &:after {
    z-index: -1; /* Ensure it's behind the button but above the before pseudo-element */
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #7b7b7b;
    left: 0;
    top: 0;
    border-radius: 10px;
  }
`;

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