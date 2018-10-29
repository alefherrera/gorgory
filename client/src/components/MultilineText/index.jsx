import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const MultilineText = ({ children }) => <Container>{children}</Container>;

MultilineText.propTypes = {
  children: PropTypes.any,
};

export default MultilineText;
