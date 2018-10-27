import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import { menuItems } from './data';
import UserAvatar from '../../components/UserAvatar';

const styles = theme => ({
  drawer: {
    position: 'relative',
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
});

const Menu = ({ classes, username }) => (
  <Drawer
    variant="permanent"
    classes={{
      paper: classes.drawer,
    }}
  >
    <div className={classes.toolbar} />
    <UserAvatar username={username} />
    <Divider />
    <List>{menuItems}</List>
  </Drawer>
);

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  username: PropTypes.any,
};

export default withStyles(styles)(Menu);
