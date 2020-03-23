import React from 'react';
import styled from 'styled-components';
import { theme } from '../style/theme';

const Avatar = styled.img`
  width: 15rem;
  border-radius: 50%;
  border: 0.5rem solid ${theme.primary};
`;

const SpeakerContainer = styled.article``;

const NamesContainer = styled.div`
  margin-top: -3.5rem;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-weight: 400;

    & + h2 {
      margin-top: -0.5rem;
    }
  }

  h1,
  h2 {
    border-radius: 0.5rem;
    padding: 0.5rem;

    background: ${theme.primary};
    color: ${theme.offblack};
  }

  a {
    color: ${theme.offblack};
  }
`;

const Speaker = ({ name, instagram, avatar }) => {
  const handle = instagram
    .split('/')
    .filter(Boolean)
    .pop();

  return (
    <SpeakerContainer>
      <Avatar src={avatar} alt={`Avatar di ${name}`} />

      <NamesContainer>
        <h1>{name}</h1>
        <h2>
          <a href={instagram}>@{handle}</a>
        </h2>
      </NamesContainer>
    </SpeakerContainer>
  );
};

export default Speaker;
