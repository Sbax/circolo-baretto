import styled from 'styled-components';
import { theme } from '../style/theme';

const Button = styled.button`
  display: inline-block;
  padding: 0.25em;
  font-size: 1em;

  text-transform: uppercase;
  font-family: 'Oswald';
  background: ${({ inverted }) =>
    inverted ? theme.primaryLight : theme.offwhite};
  color: ${theme.offblack};
  border: 0;
  outline: none;
  cursor: pointer;

  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0;

    background: ${theme.primary};
    transition: height 100ms ease-in-out;
  }

  &:hover,
  &.active {
    &:after {
      height: 0.25em;
    }
  }

  &:active {
    background: ${({ inverted }) =>
      inverted ? theme.primaryLight : theme.offwhite};
  }
`;

export default Button;
