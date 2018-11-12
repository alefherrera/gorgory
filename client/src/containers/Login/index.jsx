import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { replace } from 'connected-react-router';
import FormComponent from '../../components/FormComponent';
import TextFieldWrapper from '../../components/TextFieldWrapper';
import { login } from '../../actions/login';
import { stateSelector } from '../../selectors/router';
import { isAuthenticatedSelector } from '../../selectors/session';

class Login extends Component {
  componentDidMount() {
    if (this.props.isAuth) {
      this.props.replace(this.getLastLocation());
    }
  }

  getLastLocation = () => {
    const { locationState } = this.props;
    return locationState && locationState.pathname.indexOf('login') > 0 ? '' : locationState;
  };

  handleSubmit = (values) => {
    this.props.login(values).then((r) => {
      this.props.replace(this.getLastLocation());
      return r;
    });
  };

  render() {
    return (
      <FormComponent
        title="Login"
        buttonText="Login"
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
      >
        <Field name="username" label="Usuario" component={TextFieldWrapper} />
        <Field name="password" label="Contraseña" type="password" component={TextFieldWrapper} />
      </FormComponent>
    );
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func,
  login: PropTypes.func,
  replace: PropTypes.func,
  locationState: PropTypes.any,
  isAuth: PropTypes.bool,
};

export default connect(
  state => ({
    locationState: stateSelector(state),
    isAuth: isAuthenticatedSelector(state),
  }),
  { login, replace },
)(reduxForm({ form: 'login' })(Login));
