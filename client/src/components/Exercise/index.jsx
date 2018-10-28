import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';

const Exercise = ({ title, exercise }) => (
  <Card>
    <CardContent>
      <Typography gutterBottom variant="h5">
        {title}
      </Typography>
      <Typography gutterBottom variant="body1">
        {exercise.description || 'Descripcion'}
      </Typography>
    </CardContent>
    <CardActions>
      <IconButton component={Link} to={`exercise/${exercise.id}`}>
        <Icon style={{ color: '#00897b' }}>play_circle_filled</Icon>
      </IconButton>
    </CardActions>
  </Card>
);

Exercise.propTypes = {
  title: PropTypes.string,
  exercise: PropTypes.object,
};

export default Exercise;
