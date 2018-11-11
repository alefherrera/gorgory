import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyledButton } from '../Generic';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const FollowCourseButton = ({
  course = {},
  user = {},
  onSubscribe = () => {},
  onUnsubscribe = () => {},
}) => (
  <Container>
    {(course.teachers && course.teachers.find(teacher => teacher.id === user.id))
    || (course.students && course.students.find(student => student.id === user.id)) ? (
      <StyledButton onClick={() => onUnsubscribe(course)} color="secondary">
        Desuscribirse
      </StyledButton>
      ) : (
        <StyledButton onClick={() => onSubscribe(course)} color="primary">
        Suscribirse
        </StyledButton>
      )}
  </Container>
);

FollowCourseButton.propTypes = {
  course: PropTypes.object,
  user: PropTypes.object,
  onSubscribe: PropTypes.func,
  onUnsubscribe: PropTypes.func,
};

export default FollowCourseButton;
