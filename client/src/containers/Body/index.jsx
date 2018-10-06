import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  height: 80vh;
`;

const Body = ({ children }) => (
  <Card>
    <Container>{children}</Container>
  </Card>
);

Body.propTypes = {
  children: PropTypes.any,
};

export default Body;
