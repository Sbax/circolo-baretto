import React from 'react';
import styled from 'styled-components';
import { Link } from 'wouter';
import { ReactComponent as Beer } from '../svgs/beer.svg';

const Container = styled.section`
  height: 100%;
  font-size: 4rem;
  font-weight: 400;

  > .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    > * + * {
      margin-top: 2rem;
    }
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: 6rem;
    width: 6rem;
  }
`;

const NotFound = () => {
  return (
    <Container>
      <div className="container">
        <Link href="/">
          <div>404</div>
          <Icon>
            <Beer /> ?
          </Icon>
          <div>Torna alla home</div>
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;
