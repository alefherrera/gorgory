import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import MoreVert from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import withRouter from 'react-router-dom/withRouter';
import Fab from '../Fab';
import AlertDialog from '../AlertDialog';

class ListFormComponent extends Component {
  state = {
    anchorEl: null,
    showDeleteDialog: false,
  };

  handleDeleteSubmit = () => {
    this.props.onDeleteClick(this.state.id);
    this.setState({ showDeleteDialog: false });
  };

  handleDeleteClick = () => {
    this.setState({ showDeleteDialog: true });
    this.handleClose();
  };

  handleDeleteCancel = () => {
    this.setState({ showDeleteDialog: false });
  };

  handleMenuClick = id => (event) => {
    this.setState({ anchorEl: event.currentTarget, id });
  };

  handleEditClick = () => {
    this.handleClose();
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl, id } = this.state;
    const {
      items,
      match,
      getPrimaryText,
      getSecondaryText,
      title,
      getOptions,
      header,
      showAdd,
      showEdit,
      showDelete,
    } = this.props;
    return (
      <div>
        <Typography gutterBottom variant="title" align="left" component="h2">
          {title}
        </Typography>
        <div>{header}</div>
        <List>
          {items
            && items.map(x => (
              <ListItem key={x.id}>
                <Avatar>{getPrimaryText(x)[0].toUpperCase()}</Avatar>
                <ListItemText primary={getPrimaryText(x)} secondary={getSecondaryText(x)} />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Options" onClick={this.handleMenuClick(x.id)}>
                    <MoreVert />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          {showEdit && (
            <MenuItem component={Link} to={`${match.url}/edit/${id}`}>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              <ListItemText primary="Editar" />
            </MenuItem>
          )}
          {showDelete && (
            <MenuItem onClick={this.handleDeleteClick}>
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              <ListItemText primary="Eliminar" />
            </MenuItem>
          )}
          {getOptions(id).map((x, i) => (
            /* eslint-disable */
            <div role="menu" onClick={this.handleClose} key={i}>
              {x}
            </div>
            /* eslint-enable */
          ))}
        </Menu>
        {showAdd && (
          <Fab component={Link} to={`${match.url}/add`}>
            <Add />
          </Fab>
        )}
        {showDelete && (
          <AlertDialog
            title="¿Desea continuar?"
            open={this.state.showDeleteDialog}
            onSubmit={this.handleDeleteSubmit}
            onCancel={this.handleDeleteCancel}
          />
        )}
      </div>
    );
  }
}

ListFormComponent.propTypes = {
  items: PropTypes.array,
  match: PropTypes.object,
  getPrimaryText: PropTypes.func,
  getSecondaryText: PropTypes.func,
  onDeleteClick: PropTypes.func,
  title: PropTypes.string,
  getOptions: PropTypes.func,
  header: PropTypes.any,
  showAdd: PropTypes.bool,
  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool,
};

ListFormComponent.defaultProps = {
  getPrimaryText: () => '',
  getSecondaryText: () => '',
  getOptions: () => [],
  showDelete: true,
  showEdit: true,
  showAdd: true,
};

export default withRouter(ListFormComponent);
