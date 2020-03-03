/* eslint-disable */
const fetch = require('node-fetch');
const url = 'https://api.podomatic.com/v2/podcasts/6081391/episodes';

const mapEpisodes = ({
  episode_guid,
  media_url,
  title,
  description,
  duration,
  large_image_url,
  published_datetime
}) => ({
  id: episode_guid,
  title,
  description,
  duration,
  image: large_image_url,
  date: published_datetime,
  media: media_url
});

const getEpisodes = async page => {
  try {
    const response = await fetch(`${url}?podcast=true&page=${page}`, {
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    const { episodes, pagination } = data;
    const isLastPage = pagination.page === pagination.page_count;

    const mappedEpisodes = episodes.map(mapEpisodes);

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: {
          episodes: mappedEpisodes,
          isLastPage
        }
      })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ data: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};

const getEpisode = async id => {
  try {
    const response = await fetch(`${url}/${id}`, {
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    const { episode } = data;
    if (!episode)
      return {
        statusCode: 400,
        body: JSON.stringify({
          data: 'Episode not found'
        })
      };

    const mappedEpisode = mapEpisodes(episode);

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: {
          episode: mappedEpisode
        }
      })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ data: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};

exports.handler = async event => {
  const path = event.path.split('/').pop();

  if (path === 'episodes') {
    const page = event.queryStringParameters.page || 1;
    return getEpisodes(page);
  }

  if (path === 'episode') {
    const id = event.queryStringParameters.episode;
    if (!id)
      return {
        statusCode: 500,
        body: JSON.stringify({ data: 'Should provide an episode id' })
      };

    return getEpisode(id);
  }

  return {
    statusCode: 500,
    body: JSON.stringify({ data: 'Wrong API call' })
  };
};
