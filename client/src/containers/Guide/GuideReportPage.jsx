import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  reportSelector,
  mostFailedExerciseSelector,
  mostUnknownExerciseSelector,
} from '../../selectors/entities/guide';
import ReportHeader from '../../components/ReportHeader';
import ReportCourse from '../../components/ReportCourse';
import { getGuideReport } from '../../actions/guide';
import ReportTotalsPanel from '../../components/ReportTotalsPanel';

class GuideReportPage extends Component {
  componentDidMount() {
    this.props.getGuideReport(undefined, { id: this.props.match.params.guideId });
  }

  render() {
    const { report, mostFailedExercise, mostUnknownExercise } = this.props;
    return (
      <div>
        <ReportHeader title={report.name} />
        {report.courses.map((course, i) => (
          <ReportCourse key={i} course={course} />
        ))}
        <ReportTotalsPanel
          mostFailedExercise={mostFailedExercise}
          mostUnknownExercise={mostUnknownExercise}
        />
      </div>
    );
  }
}

GuideReportPage.propTypes = {
  getGuideReport: PropTypes.func,
  match: PropTypes.object,
  report: PropTypes.object,
  mostFailedExercise: PropTypes.object,
  mostUnknownExercise: PropTypes.object,
};

GuideReportPage.defaultProps = {
  getGuideReport: () => {},
};

export default connect(
  state => ({
    report: reportSelector(state),
    mostFailedExercise: mostFailedExerciseSelector(state),
    mostUnknownExercise: mostUnknownExerciseSelector(state),
  }),
  { getGuideReport },
)(GuideReportPage);
