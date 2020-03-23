import React from 'react';
import Contacts from './Contacts';
import LatestEpisodes from './LatestEpisodes';
import Speakers from './Speakers';
import WhereToListen from './WhereToListen';

const About = () => {
  return (
    <>
      <LatestEpisodes />
      <Speakers />
      <WhereToListen />
      <Contacts />
    </>
  );
};

export default About;
