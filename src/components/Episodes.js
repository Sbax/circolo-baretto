import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'wouter';
import { EpisodesContext } from '../episodes.context';
import { PlayerContext } from '../player.context';
import { theme } from '../style/theme';
import Button from './Button';
import Loader from './Loader';

const Container = styled.section`
  height: 100%;
`;

const SingleEpisode = styled.article`
  display: flex;

  line-height: 1.4rem;

  h1 {
    line-height: 1.5;
    font-size: 1.2rem;
    font-weight: 400;
    text-transform: uppercase;

    &:hover {
      color: ${theme.offwhite};
    }

    > a {
      padding: 0 0.25rem;
      display: inline;
      background: ${theme.primary};
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      color: currentColor;
      transition: 100ms ease-in-out;
    }
  }

  h3 {
    text-transform: uppercase;
  }

  p {
    font-family: 'Quattrocento';
    font-weight: 200;
    white-space: pre-wrap;

    > a {
      font-family: 'Oswald';
      font-weight: 400;
      font-size: 0.9rem;
      line-height: 0.7rem;

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
  }
`;

const Body = styled.div`
  flex: 1;
  margin: 0 0.5rem;
  padding-left: 0.5rem;
  border-left: 0.25rem solid ${theme.primary};

  > * + * {
    margin-top: 0.5rem;
  }
`;

const Episode = ({ id, title, date, image, description, play }) => {
  const episodeDescription = (() => {
    const [cutDescription] = description.split('\n');
    if (cutDescription.length < 100) {
      return (
        description
          .slice(0, 100)
          .split(' ')
          .slice(0, -1)
          .join(' ') + '...'
      );
    }

    return cutDescription;
  })();

  return (
    <SingleEpisode>
      <Body>
        <h3>{format(new Date(date), 'd MMMM yyy', { locale: it })}</h3>
        <h1>
          <Link href={`/episodes/${id}`}>{title}</Link>
        </h1>
        <p>
          {episodeDescription}{' '}
          <Link href={`/episodes/${id}`}>Mostra altro</Link>
        </p>
        <Button onClick={play}>Ascolta ora</Button>
      </Body>
    </SingleEpisode>
  );
};

const Wrapper = ({ children }) => (
  <Container>
    <div className="container">{children}</div>
  </Container>
);

const EpisodeList = styled.div`
  margin: 1rem 0;

  > * + * {
    margin-top: 1rem;
  }
`;

const LoaderContainer = styled.div`
  font-size: 2.5rem;
  color: ${theme.primary};
`;

const Episodes = () => {
  const episodesContext = useContext(EpisodesContext);
  const { page, episodes, isLastPage } = episodesContext.state;

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

  return (
    <Wrapper>
      <EpisodeList>
        {episodes.map(episode => (
          <Episode
            {...episode}
            key={episode.id}
            play={() => updatePlaying(episode)}
          />
        ))}
      </EpisodeList>
      {!isLastPage && (
        <Button inverted onClick={() => episodesContext.getEpisodes()}>
          Altri episodi
        </Button>
      )}
    </Wrapper>
  );
};

export default Episodes;
