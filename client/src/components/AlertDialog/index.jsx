import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends Component {
  handleSubmit = () => {
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit();
    }
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  };

  render() {
    const { title, content, open } = this.props;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={this.handleSubmit} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AlertDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.any,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default AlertDialog;
