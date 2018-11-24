import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { addGuide, createGuide } from '../../actions/guide';
import { displayNotification } from '../../actions/notification';
import { getSubscribedCourses } from '../../actions/course';
import { createdGuideSelector } from '../../selectors/createGuide';
import { subscribedCoursesSelector } from '../../selectors/entities/course';
import GuideEditorLayout from '../../components/Guide/GuideEditorLayout';

class AddGuidePage extends Component {
  componentDidMount = () => {
    this.props.createGuide();
    this.props.getSubscribedCourses();
  };

  handleSubmit = (values) => {
    this.props
      .addGuide({
        ...values,
        ...this.props.created,
        courses: [{ id: values.course }],
      })
      .then(() => {
        this.props.displayNotification('Guia creada correctamente').then(() => {
          this.props.reset();
          this.props.history.push('/guide/list');
        });
      });
  };

  render() {
    return (
      <GuideEditorLayout
        title="Nueva Guia"
        handleSubmit={this.props.handleSubmit(this.handleSubmit)}
        courses={this.props.courses}
        guide={this.props.created}
      />
    );
  }
}

AddGuidePage.propTypes = {
  handleSubmit: PropTypes.func,
  addGuide: PropTypes.func,
  createGuide: PropTypes.func,
  displayNotification: PropTypes.func,
  created: PropTypes.object,
  history: PropTypes.object,
  reset: PropTypes.func,
  getSubscribedCourses: PropTypes.func,
  courses: PropTypes.array,
};

export default connect(
  state => ({
    created: createdGuideSelector(state),
    courses: subscribedCoursesSelector(state),
  }),
  {
    addGuide,
    createGuide,
    displayNotification,
    getSubscribedCourses,
  },
)(
  reduxForm({
    form: 'addGuide',

    destroyOnUnmount: false,
  })(AddGuidePage),
);
