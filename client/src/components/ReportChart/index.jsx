import React from 'react';
import { Pie } from 'react-chartjs-2';
import { COLOR_OK, COLOR_ERROR, COLOR_UNKNOWN } from '../../constants/color';

const data = {
  datasets: [
    {
      data: [10, 20, 30],
      backgroundColor: [COLOR_OK, COLOR_ERROR, COLOR_UNKNOWN],
    },
  ],
  labels: ['Ok', 'Error', 'No subidos'],
};

const ReportChart = () => <Pie data={data} />;

export default ReportChart;
