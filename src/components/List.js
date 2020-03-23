import React from 'react';
import styled from 'styled-components';
import { theme } from '../style/theme';
import Button from './Button';

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

const ListContainer = styled.ul`
  display: flex;

  > * + * {
    margin-left: 1rem;
  }
`;

const List = ({ title, list }) => {
  return (
    <>
      <Title>
        <span>{title}</span>
      </Title>
      <ListContainer>
        {list.map(single => (
          <li key={single.link}>
            <a href={single.link}>
              <Button inverted>{single.label}</Button>
            </a>
          </li>
        ))}
      </ListContainer>
    </>
  );
};

export default List;
