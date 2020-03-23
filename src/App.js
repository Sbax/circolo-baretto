import React from 'react';
import { Route, Switch } from 'wouter';
import About from './components/About';
import EpisodePage from './components/EpisodePage';
import Episodes from './components/Episodes';
import Header from './components/Header';
import NotFound from './components/NotFound';
import Player from './components/Player';
import { EpisodesProvider } from './episodes.context';
import { PlayerProvider } from './player.context';
import GlobalStyle from './style/GlobalStyle';
const App = () => {
  return (
    <EpisodesProvider>
      <PlayerProvider>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route path="/" component={About} />
          <Route path="/episodes" component={Episodes} />
          <Route path="/episodes/:id">
            {params => <EpisodePage {...params} />}
          </Route>
          <Route path="/:any*" component={NotFound} />
        </Switch>

        <Player />
      </PlayerProvider>
    </EpisodesProvider>
  );
};

export default App;
