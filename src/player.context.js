import React, { createContext, useReducer } from 'react';

const defaultValues = {
  playingEpisode: null,
  updatePlaying: () => {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setPlayingEpisode':
      return { ...state, playingEpisode: action.playingEpisode };
    default:
      throw new Error();
  }
};

export const updatePlayingTrack = (dispatch, episode) =>
  dispatch({ type: 'setPlayingEpisode', playingEpisode: episode });

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultValues);

  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};
