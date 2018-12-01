import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reportSelector } from '../../selectors/entities/guide';
import ReportHeader from '../../components/ReportHeader';
import ReportCourse from '../../components/ReportCourse';

class GuideReportPage extends Component {
  componentDidMount() {
    this.props.getReport(undefined, { id: this.props.match.params.guideId });
  }

  render() {
    const { report } = this.props;
    return (
      <div>
        <ReportHeader title={report.name} />
        {report.courses.map((course, i) => (
          <ReportCourse key={i} course={course} />
        ))}
      </div>
    );
  }
}

GuideReportPage.propTypes = {
  getReport: PropTypes.func,
  match: PropTypes.object,
  report: PropTypes.object,
};

GuideReportPage.defaultProps = {
  getReport: () => {},
};

export default connect(
  state => ({
    report: reportSelector(state),
  }),
  null,
)(GuideReportPage);
