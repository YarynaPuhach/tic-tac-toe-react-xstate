import styled, { keyframes } from 'styled-components';

const shadowIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
`;

const tileIn = keyframes`
  from {
    opacity: 0;
    transform: translateZ(80px) scale(1.25);
  }
`;

export const StyledTile = styled.div<{ player: 'x' | 'o' | null; fontSize: string }>`
  position: relative;
  display: grid;
  place-items: center;
  font-size: ${({ fontSize }) => fontSize};
  background: white;
  cursor: pointer;
  color: transparent;
  user-select: none;
  transition: 0.15s linear;
  transition-property: opacity, background-color;

  &::before,
  &::after {
    content: attr(data-player);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    animation-duration: 0.6s;
    animation-timing-function: ease-out;
    transform-style: preserve-3d;
  }

  &::before {
    text-shadow: 0 0 0.1em var(--background-shadow);
    animation-name: ${({ player }) => (player ? shadowIn : 'none')};
  }

  &::after {
    color: #7c24ff;
    text-shadow: 0 0 0.1em var(--background-shadow);
    animation-name: ${({ player }) => (player ? tileIn : 'none')};
    transform: translateZ(3px) scale(1);
  }

  &[data-player="o"]::after {
    color: #ebffbc;
  }
`;