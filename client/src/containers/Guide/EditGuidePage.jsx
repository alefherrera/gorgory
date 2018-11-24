import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import GuideEditorLayout from '../../components/Guide/GuideEditorLayout';
import { editGuideSelector } from '../../selectors/entities/guide';
import { subscribedCoursesSelector } from '../../selectors/entities/course';

class EditGuidePage extends Component {
  handleSubmit = () => {
    console.log('Submit edit');
  };

  render() {
    const { guideId } = this.props.match.params;
    const { guide, courses } = this.props;
    return (
      <GuideEditorLayout
        title="Editar Guia"
        handleSubmit={this.props.handleSubmit(this.handleSubmit)}
        courses={courses}
        guide={guide}
      />
    );
  }
}

const getInitalValues = guide => ({
  start: guide.start,
  end: guide.end,
  name: guide.name,
  language: guide.language,
  course: guide.course,
});

export default connect(
  state => ({
    guide: editGuideSelector(state),
    courses: subscribedCoursesSelector(state),
    initialValues: { ...editGuideSelector(state) },
  }),
  {},
)(
  reduxForm({
    form: 'editGuide',

    destroyOnUnmount: false,
  })(EditGuidePage),
);
