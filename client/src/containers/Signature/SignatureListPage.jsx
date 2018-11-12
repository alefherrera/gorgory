import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSignatures, deleteSignature } from '../../actions/signature';
import ListFormComponent from '../../components/ListFormComponent';
import { displayNotification } from '../../actions/notification';
import { signaturesSelector } from '../../selectors/entities/signature';

class SignatureListPage extends Component {
  componentDidMount() {
    this.props.getSignatures();
  }

  getPrimaryText = x => x.name;

  getSecondaryText = () => '';

  handleDeleteClick = (id) => {
    this.props.deleteSignature(undefined, { id }).then((x) => {
      this.props.displayNotification('Materia eliminado correctamente');
      return x;
    });
  };

  render() {
    const { Signatures } = this.props;
    return (
      <ListFormComponent
        title="Materias"
        items={Signatures}
        getPrimaryText={this.getPrimaryText}
        getSecondaryText={this.getSecondaryText}
        onDeleteClick={this.handleDeleteClick}
      />
    );
  }
}

SignatureListPage.propTypes = {
  getSignatures: PropTypes.func,
  deleteSignature: PropTypes.func,
  Signatures: PropTypes.array,
  displayNotification: PropTypes.func,
};

export default connect(
  state => ({
    Signatures: signaturesSelector(state),
  }),
  { getSignatures, deleteSignature, displayNotification },
)(SignatureListPage);
