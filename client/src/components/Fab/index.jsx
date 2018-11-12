import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

const Fab = ({ classes, children, ...rest }) => (
  <Button variant="fab" color="primary" className={classes.fab} {...rest}>
    {children}
  </Button>
);

Fab.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.any,
};

export default withStyles(styles, { withTheme: true })(Fab);
