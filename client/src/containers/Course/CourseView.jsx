import { Divider, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { TitleText } from '../../components/Generic';
import MultilineText from '../../components/MultilineText';
import { exerciseSelector } from '../../selectors/entities/exercise';
import { getCourse, subscribeCourse, unsubscribeCourse } from '../../actions/course';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 12px;
`;

const Row = styled.div`
  width: 100%;
  margin-top: 6px;
  margin-bottom: 6px;
  height: ${props => props.height || '100%'};
  justify-content: ${props => props.align || 'left'};
`;

class CourseView extends Component {
  componentDidMount = () => {
    const { courseId } = this.props.match.params;
    this.props.getCourse(undefined, { id: courseId });
  };

  handleSubscribe = (course) => {
    this.props.subscribeCourse(undefined, { id: course.id });
  };

  handleUnsubscribe = (course) => {
    this.props.unsubscribeCourse(undefined, { id: course.id });
  };

  render() {
    const { course } = this.props;
    return (
      <div>
        <TitleText text="Comisión" />
        <Divider />
        <Container>
          <Row>
            <Typography gutterBottom variant="title" align="left" component="h1">
              {course.name}
            </Typography>
          </Row>
          <Row height="150px">
            <MultilineText>{course.description}</MultilineText>
          </Row>
          <Row>
            <Typography gutterBottom variant="title" align="left" component="h2">
              Docentes
            </Typography>
          </Row>
          <Row height="150px">
            {course.teachers.reduce((prev, next) => `${prev + next}, `, '').slice(0, -2)}
          </Row>
          <Row>
            <div />
          </Row>
        </Container>
      </div>
    );
  }
}

CourseView.propTypes = {
  match: PropTypes.object,
  course: PropTypes.object,
  getCourse: PropTypes.func,
  subscribeCourse: PropTypes.func,
  unsubscribeCourse: PropTypes.func,
};

export default connect(
  state => ({
    exercise: exerciseSelector(state),
  }),
  { getCourse, subscribeCourse, unsubscribeCourse },
)(reduxForm({ form: 'resolution' })(CourseView));
