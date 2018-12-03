import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { COLOR_OK, COLOR_ERROR, COLOR_UNKNOWN } from '../../constants/color';

const getData = input => ({
  datasets: [
    {
      data: [input.done, input.error, input.unknown],
      backgroundColor: [COLOR_OK, COLOR_ERROR, COLOR_UNKNOWN],
    },
  ],
  labels: ['Ok', 'Error', 'No subidos'],
});

const ReportChart = ({ data }) => <Pie data={getData(data)} />;

ReportChart.propTypes = {
  data: PropTypes.object,
};

export default ReportChart;
