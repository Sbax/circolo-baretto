import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LoaderIcon } from '../svgs/loader.svg';

const Container = styled.span`
  display: inline-block;
  height: 1em;
  width: 1em;
  line-height: 1em;
`;

const Loader = () => {
  return (
    <Container>
      <LoaderIcon />
    </Container>
  );
};

export default Loader;
