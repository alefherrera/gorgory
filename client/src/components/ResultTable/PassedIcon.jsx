import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Table from '@material-ui/core/Table';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';

const PassedIcon = ({ value }) => {
    return value ? <ThumbUp /> : <ThumbDown />
}

PassedIcon.propTypes = {
    value: PropTypes.bool,
}

export default PassedIcon;