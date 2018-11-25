import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResultTable from '../../components/ResultTable';
import { outputSelector } from '../../selectors/resolution';
import DetailDialog from '../../components/DetailDialog';

class OutputLogger extends Component {
  state = {
    open: false,
    result: {},
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDetailClick = (result) => {
    this.setState({
      open: true,
      result,
    });
  };

  render() {
    const { output } = this.props;
    const { open, result } = this.state;
    return (
      <div>
        <ResultTable output={output} onDetailClick={this.handleDetailClick} />
        <DetailDialog open={open} result={result} onClose={this.handleClose} />
      </div>
    );
  }
}

OutputLogger.propTypes = {
  output: PropTypes.array,
};

export default connect(
  state => ({
    output: outputSelector(state),
  }),
  null,
)(OutputLogger);
