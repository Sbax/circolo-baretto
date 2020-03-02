import React, { useContext } from 'react';
import { EpisodesContext } from '../episodes.context';
import styled from 'styled-components';
import { theme } from '../style/theme';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { PlayerContext, updatePlayingTrack } from '../player.context';
import Loader from './Loader';
import Button from './Button';

const LoaderContainer = styled.div`
  font-size: 2.5rem;
`;

const Container = styled.section`
  background: ${theme.secondary};
  color: white;

  > .container {
    min-height: 12rem;
    display: flex;
    justify-content: center;
    align-items: center;
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

  @media screen and (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;

    > * {
      padding: 0.5rem;
    }

    > * + * {
      margin-top: 0.5rem;
      margin-left: 0;
    }
  }
`;

const SingleEpisode = styled.article`
  line-height: 1.4rem;

  h1 {
    font-weight: 400;
    min-height: ${1.4 * 3}rem;
    @media screen and (max-width: ${theme.breakpoints.tablet}) {
      min-height: 0;
    }

    text-transform: uppercase;
    color: white;
  }

  h3 {
    text-transform: uppercase;
  }

  > * + * {
    margin-top: 0.5rem;
  }
`;

const Episode = ({ title, date, play }) => (
  <SingleEpisode>
    <h3>{format(new Date(date), 'd MMMM yyy', { locale: it })}</h3>
    <h1>{title}</h1>

    <Button onClick={play}>Ascolta ora</Button>
  </SingleEpisode>
);

const LatestEpisodes = () => {
  const { page, episodes, isLastPage, updateData } = useContext(
    EpisodesContext
  );

  const { dispatch } = useContext(PlayerContext);

  const updatePlaying = episode => updatePlayingTrack(dispatch, episode);

  if (!page) {
    updateData(page, isLastPage);

    return (
      <Container>
        <div className="container">
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        </div>
      </Container>
    );
  }

  const latestEpisodes = episodes
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <Container>
      <div className="container">
        <EpisodeList>
          {latestEpisodes.map(episode => (
            <Episode
              {...episode}
              play={() => updatePlaying(episode)}
              key={episode.id}
            />
          ))}
        </EpisodeList>
      </div>
    </Container>
  );
};

export default LatestEpisodes;
