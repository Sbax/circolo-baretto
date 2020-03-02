import styled from 'styled-components';
import { theme } from '../style/theme';

const Button = styled.button`
  display: inline-block;
  padding: 0.5rem;
  font-size: 1em;

  text-transform: uppercase;
  font-family: 'Oswald';
  background: white;
  color: ${theme.offblack};

  position: relative;
  outline: none;

  cursor: pointer;

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

  &:active {
    background: white;
  }
`;

export default Button;
