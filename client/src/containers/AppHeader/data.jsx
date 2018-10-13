// This file is shared across the demos.

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { NavLink } from 'react-router-dom';

export const menuItems = (
  <div>
    <ListItem button component={NavLink} to="/login">
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Login" />
    </ListItem>
    <ListItem button component={NavLink} to="/editor">
      <ListItemIcon>
        <CloudUploadIcon />
      </ListItemIcon>
      <ListItemText primary="Resolucion" />
    </ListItem>
    <ListItem button component={NavLink} to="/guide">
      <ListItemIcon>
        <CloudUploadIcon />
      </ListItemIcon>
      <ListItemText primary="Guia" />
    </ListItem>
  </div>
);
