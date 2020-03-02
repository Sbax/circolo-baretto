import React, { createContext, useState } from 'react';

const sessionKey = 'circolo-baretto-session-items';

const defaultValues = {
  episodes: [],
  page: 0,
  isLastPage: false,
  playing: null,
  updateData: () => {}
};

export const EpisodesContext = createContext();

export const EpisodesProvider = ({ children }) => {
  const updateData = () => {
    const { isLastPage, page } = data;
    const fetchedEpisodes = data.episodes;
    const newPage = isLastPage ? page : page + 1;

    const getEpisodes = async () => {
      const response = await fetch(
        `/.netlify/functions/node-fetch?page=${newPage}`
      ).catch(error => ({ error }));

      if (response.error) return console.error(response.error);

      const { data } = await response.json();
      const { episodes, isLastPage } = data;

      const newData = {
        page: newPage,
        episodes: [...fetchedEpisodes, ...episodes],
        isLastPage
      };

      sessionStorage.setItem(sessionKey, JSON.stringify(newData));
      setData(newData);
    };

    getEpisodes();
  };

  const sessionValues = sessionStorage.getItem(sessionKey);
  const values = sessionValues ? JSON.parse(sessionValues) : defaultValues;

  const [data, setData] = useState({
    ...values,
    updateData
  });

  return (
    <EpisodesContext.Provider value={data}>{children}</EpisodesContext.Provider>
  );
};
