import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import SearchBoxWrapper from '../../components/SearchBoxWrapper';

class SearchGuidePage extends Component {
  handleSubmit = (values) => {
    console.log('values', values);
  };

  render() {
    const { guides } = this.props;
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <Field name="q" component={SearchBoxWrapper} />
        </form>
        <div>{JSON.stringify(guides)}</div>
      </div>
    );
  }
}

SearchGuidePage.propTypes = {
  guides: PropTypes.array,
  handleSubmit: PropTypes.func,
};

export default connect(
  null,
  null,
)(reduxForm({ form: 'searchGuide' })(SearchGuidePage));
