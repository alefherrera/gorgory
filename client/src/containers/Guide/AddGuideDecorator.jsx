import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGuide } from '../../actions/guide';

class AddGuideDecorator extends Component {
  componentDidMount = () => {
    debugger;
    this.props.createGuide();
    this.props.history.push('/guide/add');
  };

  render() {
    return <div />;
  }
}

export default connect(
  () => ({}),
  { createGuide },
)(AddGuideDecorator);
