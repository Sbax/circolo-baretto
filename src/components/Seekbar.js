import React from 'react';
import styled from 'styled-components';
import { theme } from '../style/theme';

const Container = styled.div`
  height: 1rem;
  width: 100%;
  position: relative;
  cursor: pointer;

  input {
    cursor: pointer;
    height: 100%;
    width: 100%;
    opacity: 0;
    position: relative;
    z-index: 4;
  }
`;

const Background = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  height: 100%;
  width: ${({ width }) => (width || width === 0 ? width : 100)}%;

  transition: width 400ms cubic-bezier(0.5, 0.25, 0, 1);
`;

const Loaded = styled(Background)`
  background: ${theme.primaryLight};
  opacity: 0.8;
  z-index: 2;
`;

const Duration = styled(Background)`
  background: ${theme.offblack};
  opacity: 0.1;
  z-index: 1;
`;

const Track = styled(Background)`
  background: ${theme.primary};
  z-index: 3;
`;

const Seekbar = ({ ...props }) => {
  const { value, loaded } = props;

  return (
    <Container>
      <input type="range" min={0} max={1} step="any" {...props} />
      <Duration />
      <Loaded width={loaded * 100} />
      <Track width={value * 100} />
    </Container>
  );
};

export default Seekbar;
