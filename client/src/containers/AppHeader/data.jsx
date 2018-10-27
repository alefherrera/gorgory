// This file is shared across the demos.

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';
import { Icon } from '@material-ui/core';

export const menuItems = (
  <div>
    <ListItem button component={NavLink} to="/guide/add">
      <ListItemIcon>
        <Icon>add-circle-outline</Icon>
      </ListItemIcon>
      <ListItemText primary="Nueva Guia" />
    </ListItem>
    <ListItem button component={NavLink} to="/guide/list">
      <ListItemIcon>
        <Icon>assignment</Icon>
      </ListItemIcon>
      <ListItemText primary="Mis Guias" />
    </ListItem>
  </div>
);
