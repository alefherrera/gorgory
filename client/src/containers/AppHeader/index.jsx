import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { connect } from 'react-redux';
import LoadingIndicator from '../LoadingIndicator';
import Menu from './Menu';
import { logout } from '../../actions/logout';
import { isAuthenticatedSelector } from '../../selectors/session';
import gorgory from './header.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

class AppHeader extends Component {
  handleLoginClick = () => {
    this.props.history.push('/login');
  };

  handleLogoutClick = () => {
    this.props.logout();
    this.handleLoginClick();
  };

  renderButton = () => {
    if (!this.props.isAuth) {
      return (
        <Button color="inherit" onClick={this.handleLoginClick}>
          Login
        </Button>
      );
    }
    return (
      <Button color="inherit" onClick={this.handleLogoutClick}>
        Salir
      </Button>
    );
  };

  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <img src={gorgory} alt="img" style={{ height: 40, marginRight: 10 }} />
            <Typography style={{ width: 200 }} variant="h5" color="inherit" noWrap>
              Gorgory
            </Typography>
            <ButtonContainer>{this.renderButton()}</ButtonContainer>
          </Toolbar>
        </AppBar>
        <div className={classes.toolbar} />
        {this.props.isAuth && (
          <Menu>
            <div className={classes.toolbar} />
          </Menu>
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <LoadingIndicator />
          {children}
        </main>
      </div>
    );
  }
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any,
  history: PropTypes.object,
  isAuth: PropTypes.bool,
  logout: PropTypes.func,
};

export default withRouter(
  connect(
    state => ({
      isAuth: isAuthenticatedSelector(state),
    }),
    { logout },
  )(withStyles(styles)(AppHeader)),
);
