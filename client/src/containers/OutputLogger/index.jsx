import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResultTable from '../../components/ResultTable';
import { outputSelector } from '../../selectors/resolution';

const OutputLogger = ({ output }) => <ResultTable output={output} />;

OutputLogger.propTypes = {
  output: PropTypes.array,
};

export default connect(
  state => ({
    output: outputSelector(state),
  }),
  null,
)(OutputLogger);
