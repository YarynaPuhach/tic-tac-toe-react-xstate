import styled, { keyframes, css } from 'styled-components';

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

export const GameContainer = styled.div`
  text-align: center;
  position: relative; /* To ensure relative positioning of elements */
`;

export const StatusContainer = styled.div<{ isGameOver: boolean }>`
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

export const ResetButton = styled.button`
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
export const ChangeSizeContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: rgba(249,249,249,0.44);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 10px;
    font-size: 1.5em;
    color: #333;
  }

  label {
    display: flex;
    flex-direction: column;
    font-size: 1.2em;
    color: #555;
  }

  input[type="number"] {
    margin-top: 10px;
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  input[type="number"]:focus {
    border-color: #7c24ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(124, 36, 255, 0.2);
  }
`;