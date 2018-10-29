import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { guideSelector } from '../../selectors/entities/guide';
import { getGuide } from '../../actions/guide';
import Exercise from '../../components/Exercise';

class GuidePage extends Component {
  componentDidMount() {
    this.props.getGuide(undefined, { id: this.props.match.params.guideId });
  }

  render() {
    const { guide } = this.props;
    return (
      <div>
        <Typography gutterBottom variant="h2" align="left" component="h2">
          {guide.name}
        </Typography>
        {guide.exercises
          && guide.exercises.map((exercise, i) => (
            <Exercise key={i} title={`Ejercicio ${i + 1}`} exercise={exercise} />
          ))}
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
