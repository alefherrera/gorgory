import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import TextFieldWrapper from '../../components/TextFieldWrapper';
import FormComponent from '../../components/FormComponent';
import { getRoles } from '../../actions/role';

class RoleForm extends Component {
  componentDidMount() {
    this.props.getRoles();
  }

  render() {
    return (
      <FormComponent {...this.props}>
        <Field name="name" label="Nombre" component={TextFieldWrapper} />
      </FormComponent>
    );
  }
}

RoleForm.propTypes = {
  getRoles: PropTypes.func,
  roles: PropTypes.array,
};

export default connect(
  null,
  { getRoles },
)(RoleForm);
