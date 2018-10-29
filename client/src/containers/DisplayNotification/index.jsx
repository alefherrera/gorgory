import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { dismissNotification } from '../../actions/notification';
import {
  notificationMessageSelector,
  notificationShowSelector,
  notificationVariantSelector,
} from '../../selectors/ui/notification';
import ColoredSnackbar from '../../components/ColoredSnackbar';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class DisplayNotification extends Component {
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.props.dismissNotification();
  };

  render() {
    const {
      classes, message, show, variant,
    } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={show}
          autoHideDuration={2000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <Close />
            </IconButton>,
          ]}
        >
          <ColoredSnackbar variant={variant} message={message} />
        </Snackbar>
      </div>
    );
  }
}

DisplayNotification.propTypes = {
  message: PropTypes.any,
  show: PropTypes.bool,
  variant: PropTypes.string,
  classes: PropTypes.object,
  dismissNotification: PropTypes.func,
};

export default connect(
  state => ({
    message: notificationMessageSelector(state),
    show: notificationShowSelector(state),
    variant: notificationVariantSelector(state),
  }),
  { dismissNotification },
)(withStyles(styles)(DisplayNotification));
