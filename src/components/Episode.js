import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { Link } from 'wouter';
import { theme } from '../style/theme';

const SingleEpisode = styled.article`
  line-height: 1.4rem;

  h1 {
    font-weight: 400;
    text-transform: uppercase;

    > a {
      color: currentColor;
      transition: 150ms ease-in-out;

      &:hover {
        color: ${theme.primary};
      }
    }
  }

  h3 {
    text-transform: uppercase;
  }

  > * + * {
    margin-top: 0.5rem;
  }
`;

const Episode = ({ id, title, date, play }) => (
  <SingleEpisode>
    <h3>{format(new Date(date), 'd MMMM yyy', { locale: it })}</h3>
    <h1>
      <Link href={`/episodes/${id}`}>{title}</Link>
    </h1>

    <Button onClick={play}>Ascolta ora</Button>
  </SingleEpisode>
);

export default Episode;
