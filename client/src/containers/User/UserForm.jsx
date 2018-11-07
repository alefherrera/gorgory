import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import TextFieldWrapper from '../../components/TextFieldWrapper';
import FormComponent from '../../components/FormComponent';
import { getRoles } from '../../actions/role';
import SelectWrapper from '../../components/SelectWrapper';
import { required } from '../../util/validations';
import { rolesSelector } from '../../selectors/entities/role';

class UserForm extends Component {
  componentDidMount() {
    this.props.getRoles();
  }

  render() {
    return (
      <FormComponent {...this.props}>
        <Field name="username" label="Usuario" component={TextFieldWrapper} />
        <Field name="name" label="Nombre Completo" component={TextFieldWrapper} />
        <Field name="email" label="Mail" component={TextFieldWrapper} />
        <Field name="role" label="Rol" component={SelectWrapper} validate={[required]}>
          {this.props.roles.map(role => (
            <MenuItem key={role.name} value={role.name}>
              {role.name}
            </MenuItem>
          ))}
        </Field>
      </FormComponent>
    );
  }
}

UserForm.propTypes = {
  getRoles: PropTypes.func,
  roles: PropTypes.array,
};

export default connect(
  state => ({
    roles: rolesSelector(state),
  }),
  { getRoles },
)(UserForm);
