import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PropTypes, { object } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCourses, subscribeCourse, unsubscribeCourse } from '../../actions/course';
import CourseTable from '../../components/CourseTable';
import { coursesSelector } from '../../selectors/entities/course';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TitleRow = styled.div`
  justify-content: space-around;
  margin: 10px;
`;

const Row = styled.div`
  justify-content: space-around;
  margin: 10px;
  overflow-y: auto;
`;

class CourseListPage extends Component {
  componentDidMount() {
    this.props.getCourses();
  }

  handleSubscribe = (course) => {
    this.props.subscribeCourse(undefined, { id: course.id });
  };

  handleUnsubscribe = (course) => {
    this.props.unsubscribeCourse(undefined, { id: course.id });
  };

  renderIcons = course => (
    <div>
      <IconButton component={Link} to={`view/${course.id}`}>
        <Icon style={{ color: '#00897b' }}>play_circle_filled</Icon>
      </IconButton>
    </div>
  );

  render() {
    const { courses } = this.props;
    return (
      <Container>
        <TitleRow>
          <Typography gutterBottom variant="h5" align="left" component="h2">
            Comisiones
          </Typography>
        </TitleRow>
        <Row>
          <CourseTable courses={courses} iconsRenderer={this.renderIcons} />
        </Row>
      </Container>
    );
  }
}

CourseListPage.propTypes = {
  courses: PropTypes.arrayOf(object),
  getCourses: PropTypes.func,
  subscribeCourse: PropTypes.func,
  unsubscribeCourse: PropTypes.func,
};

export default connect(
  state => ({
    courses: coursesSelector(state),
  }),
  { getCourses, subscribeCourse, unsubscribeCourse },
)(CourseListPage);
