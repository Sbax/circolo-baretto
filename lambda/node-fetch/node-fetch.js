/* eslint-disable */
const fetch = require('node-fetch');

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

exports.handler = async function(event, context) {
  const page = event.queryStringParameters.page || 1;
  try {
    const response = await fetch(
      `https://api.podomatic.com/v2/podcasts/6081391/episodes?podcast=true&page=${page}`,
      {
        headers: { Accept: 'application/json' }
      }
    );
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
