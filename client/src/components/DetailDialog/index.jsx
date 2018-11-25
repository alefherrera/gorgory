import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import PassedIcon from '../PassedIcon';

const Container = styled.div`
  min-width: 400px;
`;

const TitleContainer = styled.div`
  display: flex;
`;

const EndContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

class DetailDialog extends Component {
  handleClose = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  render() {
    const { result, open } = this.props;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Container>
          <DialogTitle id="alert-dialog-title">
            <TitleContainer>
              <span>Output</span>
              <EndContainer>
                <PassedIcon value={result.state} />
              </EndContainer>
            </TitleContainer>
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">{result.output}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Container>
      </Dialog>
    );
  }
}

DetailDialog.propTypes = {
  open: PropTypes.bool,
  result: PropTypes.object,
  onClose: PropTypes.func,
};

export default DetailDialog;
