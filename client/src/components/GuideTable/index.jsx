import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'react-moment';
import { DATETIME_FORMAT } from '../../constants/date';
import GorgoryTable from '../GorgoryTable';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const columns = iconsRenderer => [
  {
    name: 'Nombre',
    options: {
      filter: true,
    },
  },
  {
    name: 'Ejercicios',
    options: {
      filter: true,
    },
  },
  {
    name: 'Fecha Modificación',
    options: {
      filter: false,
      customBodyRender: value => <Moment format={DATETIME_FORMAT} date={value} />,
    },
  },
  {
    name: 'Vigencia',
    options: {
      filter: false,
      customBodyRender: value => (
        <div>
          <Moment format={DATETIME_FORMAT} date={value.start} />
          {' '}
-
          {' '}
          <Moment format={DATETIME_FORMAT} date={value.end} />
        </div>
      ),
    },
  },
  {
    name: '',
    options: {
      filter: true,
      customBodyRender: value => iconsRenderer(value),
    },
  },
];

const adaptGuides = guides => guides.map(guide => [guide.name, guide.exercises.length, guide.updateDateTime, guide, guide]);

const GuideTable = ({ guides = [], iconsRenderer = () => {} }) => (
  <Container>
    <GorgoryTable data={adaptGuides(guides)} columns={columns(iconsRenderer)} />
  </Container>
);

GuideTable.propTypes = {
  guides: PropTypes.arrayOf(PropTypes.object),
  iconsRenderer: PropTypes.func,
};

export default GuideTable;
