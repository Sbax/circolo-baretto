import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { EpisodesContext, fetchEpisode } from '../episodes.context';
import backgroundPattern from '../images/circoloBg.png';
import { theme } from '../style/theme';
import Loader from './Loader';
import NotFound from './NotFound';
import Button from './Button';
import { PlayerContext } from '../player.context';

const wrapURLs = text => {
  const urlPattern = /(((https?):\/\/)[-\w@:%_+.~#?,&//=]+)/g;

  return text.replace(urlPattern, url => `<a href="${url}">${url}</a>`);
};

const BeersContainer = styled.section`
  background: url(${backgroundPattern});
  background-size: 4rem;

  padding: 1rem 0.5rem;

  > .container {
    display: flex;

    > * + * {
      margin-left: 1rem;
    }

    @media screen and (max-width: ${theme.breakpoints.tablet}) {
      flex-direction: column;

      > * + * {
        margin-left: 0;
        margin-top: 1rem;
      }
    }
  }

  img {
    width: 15rem;
    height: 15rem;

    @media screen and (max-width: ${theme.breakpoints.tablet}) {
      width: 5rem;
      height: 5rem;
    }
  }
`;

const Container = styled.section`
  height: 100%;

  padding: 1rem 0.5rem;

  .container {
    > * + * {
      margin-top: 1rem;
    }
  }
`;

const EpisodeDate = styled.h2`
  line-height: 1.45;
  font-weight: 400;
  text-transform: uppercase;

  > span {
    padding: 0 0.25rem;
    display: inline;
    background: ${theme.offwhite};
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
`;

const Title = styled.h1`
  line-height: 1.45;
  font-size: 2rem;
  @media screen and (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1em;
  }

  font-weight: 400;
  text-transform: uppercase;

  > span {
    padding: 0 0.25rem;
    display: inline;
    background: ${theme.offwhite};
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
`;

const Description = styled.p`
  font-family: 'Quattrocento';
  font-size: 1.2rem;
  white-space: pre-wrap;
`;

const EpisodeDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: flex-start;

  font-size: 1.4rem;
`;

const EpisodePage = ({ id }) => {
  const playerContext = useContext(PlayerContext);
  const episodesContext = useContext(EpisodesContext);
  const { episodes } = episodesContext.state;

  const episode = episodes.find(episode => episode.id === id);

  const [fetching, setFetching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const getEpisode = async id => {
    const episode = await fetchEpisode(id).catch(error => ({ error }));
    if (episode) episodesContext.addEpisode(episode);
    else setNotFound(true);
  };

  if (notFound) {
    return <NotFound />;
  }

  if (!episode) {
    if (!fetching) {
      getEpisode(id);
      setFetching(true);
    }

    return (
      <>
        <Loader />
      </>
    );
  }

  const { title, date, image, description } = episode;

  const descriptionWithLinks = wrapURLs(description);
  const updatePlaying = playerContext.updatePlayingTrack;

  return (
    <>
      <BeersContainer>
        <div class="container">
          <img src={image} alt={title} />
          <EpisodeDetails>
            <div>
              <EpisodeDate>
                <span>
                  {format(new Date(date), 'd MMMM yyy', { locale: it })}
                </span>
              </EpisodeDate>
              <Title>
                <span>{title}</span>
              </Title>
            </div>
            <Button onClick={() => updatePlaying(episode)}>Ascolta ora</Button>
          </EpisodeDetails>
        </div>
      </BeersContainer>
      <Container>
        <div className="container">
          <Description
            dangerouslySetInnerHTML={{ __html: descriptionWithLinks }}
          />
        </div>
      </Container>
    </>
  );
};

export default EpisodePage;
