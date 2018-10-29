import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';
import { showLoadingSelector } from '../../selectors/ui/loading';

const LoadingIndicator = ({ show }) => (show ? <LinearProgress color="secondary" /> : <div style={{ height: 5 }} />);

LoadingIndicator.propTypes = {
  show: PropTypes.bool,
};

export default connect(
  state => ({
    show: showLoadingSelector(state),
  }),
  null,
)(LoadingIndicator);
