import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const LanguageChooser = () => (
  <Select>
    <MenuItem value="">Ninguno</MenuItem>
    <MenuItem value="java">Java</MenuItem>
    <MenuItem value="python">Python</MenuItem>
  </Select>
);

export default LanguageChooser;
