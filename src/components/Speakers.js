import React from 'react';
import styled from 'styled-components';
import homeData from '../data/home.json';
import { theme } from '../style/theme';
import Speaker from './Speaker';

const data = homeData['speakers'];

const SpeakersContainer = styled.section`
  margin: 1rem 0.5rem;

  > .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled.h1`
  display: inline-block;
  font-size: 2rem;
  font-weight: 400;
  padding: 0.5rem 0;

  text-transform: uppercase;

  > span {
    padding: 0 0.25rem;

    background: ${theme.primary};
    color: ${theme.offblack};

    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  & + * {
    margin-top: 0.5rem;
  }
`;

const SpeakersList = styled.section`
  display: flex;
  padding: 1rem;

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
`;

const Speakers = () => {
  return (
    <SpeakersContainer>
      <div className="container">
        <Title>
          <span>Gli Speaker</span>
        </Title>

        <SpeakersList>
          {data.map(speaker => (
            <Speaker key={speaker.name} {...speaker} />
          ))}
        </SpeakersList>
      </div>
    </SpeakersContainer>
  );
};

export default Speakers;
