import { Divider, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getCourse, subscribeCourse, unsubscribeCourse } from '../../actions/course';
import { TitleText } from '../../components/Generic';
import MultilineText from '../../components/MultilineText';
import { courseSelector } from '../../selectors/entities/course';
import FollowCourseButton from '../../components/FollowCourseButton';
import { userSelector } from '../../selectors/session';
import { displayNotification } from '../../actions/notification';

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
    this.props.subscribeCourse(undefined, { id: course.id }).then(() => {
      this.props.displayNotification('Suscripción realizada correctamente.');
    });
  };

  handleUnsubscribe = (course) => {
    this.props.unsubscribeCourse(undefined, { id: course.id });
  };

  render() {
    const { course, user } = this.props;
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
            {course.teachers
              && course.teachers.reduce((prev, next) => `${prev + next.name}, `, '').slice(0, -2)}
          </Row>
          <Row>
            <FollowCourseButton
              course={course}
              user={user}
              onSubscribe={this.handleSubscribe}
              onUnsubscribe={this.handleUnsubscribe}
            />
          </Row>
        </Container>
      </div>
    );
  }
}

CourseView.propTypes = {
  match: PropTypes.object,
  course: PropTypes.object,
  user: PropTypes.object,
  getCourse: PropTypes.func,
  subscribeCourse: PropTypes.func,
  unsubscribeCourse: PropTypes.func,
  displayNotification: PropTypes.func,
};

export default connect(
  state => ({
    course: courseSelector(state),
    user: userSelector(state),
  }),
  {
    getCourse,
    subscribeCourse,
    unsubscribeCourse,
    displayNotification,
  },
)(CourseView);
