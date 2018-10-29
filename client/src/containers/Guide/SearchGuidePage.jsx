import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import SearchBoxWrapper from '../../components/SearchBoxWrapper';
import { searchSelector } from '../../selectors/entities/guide';
import { searchGuides } from '../../actions/guide';
import GuideTable from '../../components/GuideTable';

class SearchGuidePage extends Component {
  handleSubmit = (values) => {
    this.props.searchGuides(undefined, values.q ? values : { q: '' });
  };

  renderIcons = () => {};

  render() {
    const { guides } = this.props;
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <Field name="q" component={SearchBoxWrapper} />
        </form>
        <div>
          <GuideTable guides={guides} iconsRenderer={this.renderIcons} />
        </div>
      </div>
    );
  }
}

SearchGuidePage.propTypes = {
  guides: PropTypes.array,
  handleSubmit: PropTypes.func,
  searchGuides: PropTypes.func,
};

export default connect(
  state => ({
    guides: searchSelector(state),
  }),
  { searchGuides },
)(reduxForm({ form: 'searchGuide' })(SearchGuidePage));
