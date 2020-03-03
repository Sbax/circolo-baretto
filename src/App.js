import React from 'react';
import { Route, Switch } from 'wouter';
import About from './components/About';
import EpisodePage from './components/EpisodePage';
import Episodes from './components/Episodes';
import Header from './components/Header';
import Player from './components/Player';
import WhereToListen from './components/WhereToListen';
import { EpisodesProvider } from './episodes.context';
import { PlayerProvider } from './player.context';
import GlobalStyle from './style/GlobalStyle';
import NotFound from './components/NotFound';

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
          <Route path="/where" component={WhereToListen} />
          <Route path="/:any*" component={NotFound} />
        </Switch>

        <Player />
      </PlayerProvider>
    </EpisodesProvider>
  );
};

export default App;
