import React from 'react';
import styled from 'styled-components';
import backgroundPattern from '../images/circoloBg.png';
import { theme } from '../style/theme';
import ActiveLink from './ActiveLink';

const Container = styled.section`
  font-weight: 400;
  background: url(${backgroundPattern});
  width: 100%;
  height: 12rem;
  background-size: 4rem;

  > .container {
    height: 100%;
    display: flex;
    padding: 0.5rem 0;

    @media screen and (max-width: ${theme.breakpoints.tablet}) {
      flex-direction: column;

      > * + * {
        margin-top: 0.5rem;
      }
    }
  }
`;

const TitlesContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;

const Title = styled.h1`
  display: inline;
  background: white;
  font-size: 3rem;
  padding: 0.5rem;

  text-transform: uppercase;

  & + * {
    margin-top: 0.5rem;
  }
`;

const Subtitle = styled.h2`
  display: inline;
  background: white;
  padding: 0.5rem;
  text-transform: uppercase;
`;

const LinksContainer = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  > * + * {
    margin-left: 0.5rem;
  }

  > a {
    display: inline-block;
    padding: 0.5rem;

    background: white;
    color: ${theme.offblack};

    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 0rem;

      background: ${theme.primary};
      transition: height 100ms ease-in-out;
    }

    &:hover,
    &.active {
      &:after {
        height: 0.25rem;
      }
    }

    text-transform: uppercase;
    font-family: 'Oswald';
  }
`;

const Header = props => {
  return (
    <Container>
      <div className="container">
        <TitlesContainer>
          <Title>Circolo Baretto</Title>
          <Subtitle>
            Due baldi giovani si cimentano nell'antica arte del podcast
          </Subtitle>
        </TitlesContainer>

        <LinksContainer>
          <ActiveLink href="/">Chi siamo</ActiveLink>
          <ActiveLink href="/episodes">Episodi</ActiveLink>
          <ActiveLink href="/where">Contatti</ActiveLink>
        </LinksContainer>
      </div>
    </Container>
  );
};

export default Header;
