import React from 'react';
import { Route } from 'wouter';
import About from './components/About';
import Episodes from './components/Episodes';
import Header from './components/Header';
import Player from './components/Player';
import WhereToListen from './components/WhereToListen';
import { EpisodesProvider } from './episodes.context';
import GlobalStyle from './style/GlobalStyle';
import { PlayerProvider } from './player.context';

const App = () => {
  return (
    <EpisodesProvider>
      <PlayerProvider>
        <GlobalStyle />
        <Header />
        <Route path="/" component={About} />
        <Route path="/episodes" component={Episodes} />
        <Route path="/where" component={WhereToListen} />

        <Player />
      </PlayerProvider>
    </EpisodesProvider>
  );
};

export default App;
