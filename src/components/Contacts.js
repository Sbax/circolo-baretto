import React from 'react';
import styled from 'styled-components';
import homeData from '../data/home.json';
import List from './List';

const data = homeData['contacts'];

const ContactsContainer = styled.section`
  margin: 0.5rem;

  > .container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

const Contacts = () => {
  return (
    <ContactsContainer>
      <div className="container">
        <List title="Come Contattarci" list={data} />
      </div>
    </ContactsContainer>
  );
};

export default Contacts;
