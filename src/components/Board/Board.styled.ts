import styled from 'styled-components';

export const StyledBoard = styled.div`
  margin: 0 auto;
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