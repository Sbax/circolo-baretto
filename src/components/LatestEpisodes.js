import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'wouter';
import { EpisodesContext } from '../episodes.context';
import { PlayerContext } from '../player.context';
import { theme } from '../style/theme';
import Episode from './Episode';
import Loader from './Loader';

const LoaderContainer = styled.div`
  font-size: 2.5rem;
`;

const Container = styled.section`
  background: ${theme.secondary};
  color: ${theme.offwhite};

  > .container {
    min-height: 12rem;
    display: flex;
    flex-direction: column;
    padding: 1rem;

    > * + * {
      margin-top: 0.5rem;
    }
  }
`;

const EpisodeList = styled.div`
  display: flex;
  color: ${theme.secondaryLight};

  > * + * {
    margin-left: 1.5rem;
  }

  > * {
    flex: 1;
  }

  ${Episode.selector} {
    h1 {
      min-height: ${1.4 * 3}rem;
      @media screen and (max-width: ${theme.breakpoints.tablet}) {
        min-height: 0;
      }
    }
  }

  @media screen and (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;

    > * + * {
      margin-top: 0.5rem;
      margin-left: 0;
    }
  }
`;

const Row = styled.section`
  display: flex;
  align-items: flex-end;

  > * + * {
    margin-left: 0.5rem;
  }

  > a {
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
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  text-transform: uppercase;
  font-weight: 400;
`;

const Wrapper = ({ children }) => (
  <Container>
    <div className="container">
      <Row>
        <Title>Ultimi episodi</Title>
        <Link href="/episodes">Vedi tutti</Link>
      </Row>
      {children}
    </div>
  </Container>
);

const LatestEpisodes = () => {
  const episodesContext = useContext(EpisodesContext);

  const { page, episodes } = episodesContext.state;
  const playerContext = useContext(PlayerContext);

  const updatePlaying = playerContext.updatePlayingTrack;

  if (!page) {
    episodesContext.getEpisodes();

    return (
      <Wrapper>
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      </Wrapper>
    );
  }

  const latestEpisodes = episodes
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <Wrapper>
      <EpisodeList>
        {latestEpisodes.map(episode => (
          <Episode
            {...episode}
            play={() => updatePlaying(episode)}
            key={episode.id}
          />
        ))}
      </EpisodeList>
    </Wrapper>
  );
};

export default LatestEpisodes;
