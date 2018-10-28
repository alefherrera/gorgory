import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { guideSelector } from '../../selectors/entities/guide';
import { getGuide } from '../../actions/guide';

class GuidePage extends Component {
  componentDidMount() {
    this.props.getGuide(this.props.match.params.guideId);
  }

  render() {
    const { guide } = this.props;
    return (
      <div>
        <Typography gutterBottom variant="title" align="left" component="h2">
          Guia tanto
        </Typography>
        {JSON.stringify(guide)}
      </div>
    );
  }
}

GuidePage.propTypes = {
  guide: PropTypes.object,
  getGuide: PropTypes.func,
  match: PropTypes.object,
};

export default connect(
  state => ({
    guide: guideSelector(state),
  }),
  { getGuide },
)(GuidePage);
