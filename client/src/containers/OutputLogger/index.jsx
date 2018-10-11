import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { outputSelector } from '../../selectors/resolution';

const OutputLogger = ({ output }) => <div>{JSON.stringify(output)}</div>;

OutputLogger.propTypes = {
  output: PropTypes.object,
};

export default connect(
  state => ({
    output: outputSelector(state),
  }),
  null,
)(OutputLogger);
