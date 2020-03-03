import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body {
    height: 100%;
  }

  body {
    font-family: 'Oswald', sans-serif;
    font-weight: 200;
    color: ${theme.offblack};
    background: ${theme.offwhite};
    > div#root {
      margin-bottom: calc(${theme.playerHeight} + .5rem);
    }

    @media screen and (max-width: ${theme.breakpoints.tablet}) {
      font-size: 14px;
    }
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  a {
    color: ${theme.primary};
    text-decoration: none;
  }

  .container {
    max-width: 1024px;
    margin: auto;
  }

`;

export default GlobalStyle;
