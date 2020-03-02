import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { PlayerContext } from '../player.context';
import Duration from './Duration';
import Loader from './Loader';
import Seekbar from './Seekbar';
import { ReactComponent as Play } from '../svgs/play.svg';
import { ReactComponent as Pause } from '../svgs/pause.svg';
import { theme } from '../style/theme';

const Container = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;

  height: ${({ isPlaying }) => (isPlaying ? theme.playerHeight : 0)};
  background: white;
  box-shadow: 0 5px 10px rgba(33, 33, 33, 0.2),
    0 15px 40px rgba(33, 33, 33, 0.4);

  transition: all 100ms ease-in-out;

  audio {
    display: none;
  }
`;

const Button = styled.div`
  height: ${theme.playerHeight};
  width: ${theme.playerHeight};

  display: inline-grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  cursor: pointer;

  > * {
    grid-row: 1;
    grid-column: 1;

    height: ${theme.playerHeight};
    width: ${theme.playerHeight};
  }
`;

const Icon = styled.div`
  padding: 1.5rem;
  color: white;
  background: ${theme.secondary};
  opacity: 0.5;
`;

const Details = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const EpisodeDate = styled.h3`
  padding: 0.5rem 0.5rem 0 0.5rem;
  text-transform: uppercase;
`;

const Titles = styled.div``;

const Title = styled.h1`
  font-size: 1.25rem;
  padding: 0.5rem;
  font-weight: 400;

  @media screen and (max-width: ${theme.breakpoints.tablet}) {
    max-width: 15rem;
    font-size: 1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const Time = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
`;

const Player = () => {
  const playerElement = useRef(null);
  const { state } = useContext(PlayerContext);
  const { playingEpisode } = state;

  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);

  const [seeking, setSeeking] = useState(false);
  const [buffering, setBuffering] = useState(false);

  const togglePlay = () => (isPlaying ? pause() : play());
  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  useEffect(() => {
    pause();
    play();
    setPosition(0);
  }, [playingEpisode]);

  return (
    <Container isPlaying={!!playingEpisode}>
      {playingEpisode ? (
        <>
          <Button onClick={togglePlay}>
            <img src={playingEpisode.image} alt={playingEpisode.title} />
            <Icon>{isPlaying ? <Pause /> : <Play />}</Icon>
          </Button>

          <Details>
            <Titles>
              <EpisodeDate>
                {format(new Date(playingEpisode.date), 'd MMMM yyy', {
                  locale: it
                })}
              </EpisodeDate>
              <Title>{playingEpisode.title}</Title>
            </Titles>
            <div>
              <Seekbar
                value={position}
                loaded={loaded}
                onMouseDown={() => setSeeking(true)}
                onMouseUp={event => {
                  setSeeking(false);

                  playerElement.current.seekTo(parseFloat(event.target.value));
                }}
                onChange={event => {
                  setPosition(parseFloat(event.target.value));
                }}
              />
              <Time>
                <Duration value={duration * position} />/
                <Duration value={duration} />
                {buffering && <Loader />}
              </Time>
            </div>
          </Details>

          <ReactPlayer
            ref={playerElement}
            url={playingEpisode.media}
            width="0%"
            height="0%"
            playing={isPlaying}
            onProgress={({ played, loaded }) => {
              if (!seeking) setPosition(played);

              setLoaded(loaded);
            }}
            file={{ forceAudio: true }}
            onDuration={setDuration}
            onBuffer={() => setBuffering(true)}
            onBufferEnd={() => setBuffering(false)}
          />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Player;
