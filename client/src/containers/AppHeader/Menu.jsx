import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import UserAvatar from '../../components/UserAvatar';
import { menuSelector, usernameSelector } from '../../selectors/session';

const styles = () => ({
  drawer: {
    position: 'relative',
    width: 240,
  },
});

class Menu extends Component {
  renderMenu = menu => menu.map(item => (
    <ListItem button component={NavLink} to={item.link}>
      <ListItemIcon>
        <Icon>{item.icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={item.text} />
    </ListItem>
  ));

  render() {
    const {
      classes, username, menu, children,
    } = this.props;
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawer,
        }}
      >
        {children}
        <UserAvatar username={username} />
        <Divider />
        <List>{this.renderMenu(menu)}</List>
      </Drawer>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  username: PropTypes.any,
  menu: PropTypes.array,
  children: PropTypes.any,
};

export default withStyles(styles)(
  connect(
    state => ({
      menu: menuSelector(state),
      username: usernameSelector(state),
    }),
    null,
  )(Menu),
);
