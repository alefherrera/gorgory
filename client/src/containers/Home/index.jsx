import React from 'react';
import styled from 'styled-components';
import gorgory from './gorgory.png';

const Container = styled.div`
height: 80vh;
display: flex;
justify-content: center;
`;

const Home = () => (
  <Container>
    <img src={gorgory} alt="img" style={{ height: '100%' }} />
  </Container>
);

export default Home;
