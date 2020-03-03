import React, { createContext, useReducer, useCallback } from 'react';

const sessionKey = 'circolo-baretto-session-items';

const defaultValues = {
  episodes: [],
  page: 0,
  isLastPage: false
};

export const EpisodesContext = createContext();

export const fetchEpisodes = async (page, fetchedEpisodes) => {
  const newPage = page + 1;

  const response = await fetch(
    `/.netlify/functions/get-episodes/episodes?page=${newPage}`
  ).catch(error => ({ error }));

  if (response.error) {
    console.error(response.error);
    return;
  }

  const responseJson = await response.json();
  const { episodes, isLastPage } = responseJson.data;

  return {
    page: newPage,
    episodes: [...fetchedEpisodes, ...episodes],
    isLastPage
  };
};

export const fetchEpisode = async id => {
  const response = await fetch(
    `/.netlify/functions/get-episodes/episode?episode=${id}`
  ).catch(error => ({ error }));

  if (response.error) {
    console.error(response.error);
    return;
  }

  const responseJson = await response.json();
  console.log(responseJson);
  const { episode } = responseJson.data;
  return episode;
};

const reducer = (state, action) => {
  if (action.type === 'setEpisodes') {
    sessionStorage.setItem(sessionKey, JSON.stringify(action.payload));
    return action.payload;
  }

  if (action.type === 'addEpisode') {
    const newState = {
      ...state,
      episodes: [...state.episodes, action.payload]
    };
    sessionStorage.setItem(sessionKey, JSON.stringify(newState));

    return newState;
  }

  return state;
};

export const EpisodesProvider = ({ children }) => {
  const sessionValues = sessionStorage.getItem(sessionKey);
  const initialValues = sessionValues
    ? JSON.parse(sessionValues)
    : defaultValues;

  const [state, dispatch] = useReducer(reducer, initialValues);

  const getEpisodes = useCallback(async () => {
    const payload = await fetchEpisodes(state.page, state.episodes);
    if (payload) dispatch({ type: 'setEpisodes', payload });
  }, [state]);

  const addEpisode = payload => dispatch({ type: 'addEpisode', payload });

  return (
    <EpisodesContext.Provider value={{ state, getEpisodes, addEpisode }}>
      {children}
    </EpisodesContext.Provider>
  );
};
