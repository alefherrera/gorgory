import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reportSelector } from '../../selectors/entities/guide';
import ReportHeader from '../../components/ReportHeader';
import ReportCourse from '../../components/ReportCourse';
import { getGuideReport } from '../../actions/guide';

class GuideReportPage extends Component {
  componentDidMount() {
    this.props.getGuideReport(undefined, { id: this.props.match.params.guideId });
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
  getGuideReport: PropTypes.func,
  match: PropTypes.object,
  report: PropTypes.object,
};

GuideReportPage.defaultProps = {
  getGuideReport: () => {},
};

export default connect(
  state => ({
    report: reportSelector(state),
  }),
  { getGuideReport },
)(GuideReportPage);
