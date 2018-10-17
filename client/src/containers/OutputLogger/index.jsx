import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResultTable from '../../components/ResultTable'
import { outputSelector } from '../../selectors/resolution';


class OutputLogger extends Component {
  render() {
    return (
      <ResultTable output={this.props.output} />
    );
  }
}

OutputLogger.propTypes = {
  output: PropTypes.object,
};

export default connect(
  state => ({
    output: outputSelector(state),
  }),
  null,
)(OutputLogger);
