import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { COLOR_OK, COLOR_ERROR, COLOR_UNKNOWN } from '../../constants/color';

const Container = styled.div``;

const Total = ({ total }) => (
  <Container>
    <Chip
      label="Ok"
      variant="outlined"
      style={{ color: COLOR_OK }}
      avatar={<Avatar style={{ backgroundColor: COLOR_OK, color: 'white' }}>{total.done}</Avatar>}
    />
    <Chip
      label="Error"
      variant="outlined"
      style={{ color: COLOR_ERROR }}
      avatar={
        <Avatar style={{ backgroundColor: COLOR_ERROR, color: 'white' }}>{total.error}</Avatar>
      }
    />
    <Chip
      label="N/A"
      variant="outlined"
      style={{ color: COLOR_UNKNOWN }}
      avatar={
        <Avatar style={{ backgroundColor: COLOR_UNKNOWN, color: 'white' }}>{total.unknown}</Avatar>
      }
    />
  </Container>
);

Total.propTypes = {
  total: PropTypes.object,
};

export default Total;
