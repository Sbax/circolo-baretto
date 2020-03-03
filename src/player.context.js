import React, { createContext, useReducer } from 'react';

const defaultValues = {
  playingEpisode: null,
  updatePlaying: () => {}
};

const reducer = (state, action) => {
  if (action.type === 'setPlayingEpisode') {
    return { ...state, playingEpisode: action.playingEpisode };
  }
};

// export const updatePlayingTrack = (dispatch, episode) =>
//   dispatch({ type: 'setPlayingEpisode', playingEpisode: episode });

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultValues);

  const updatePlayingTrack = episode =>
    dispatch({ type: 'setPlayingEpisode', playingEpisode: episode });

  return (
    <PlayerContext.Provider value={{ state, updatePlayingTrack }}>
      {children}
    </PlayerContext.Provider>
  );
};
