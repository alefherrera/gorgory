import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { textLabels } from '../../config/dataTable';

const defaultOptions = {
  filter: true,
  filterType: 'dropdown',
  textLabels,
  print: false,
  download: false,
  selectableRows: false,
};

const getMuiTheme = () => createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        width: 'inherit',
      },
    },
  },
});

const GorgoryTable = ({ data = {}, columns = {}, options = {} }) => (
  <MuiThemeProvider theme={getMuiTheme()}>
    <MUIDataTable data={data} columns={columns} options={Object.assign(defaultOptions, options)} />
  </MuiThemeProvider>
);

GorgoryTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.object,
};

export default GorgoryTable;
