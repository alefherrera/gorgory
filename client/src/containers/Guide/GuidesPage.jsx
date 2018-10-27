import React from 'react';
import styled from 'styled-components';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import GuideTable from '../../components/GuideTable';

const Container = styled.div`
  width: 100%;
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

const GuidesPage = ({ guides = [] }) => (
  <Container>
    <TitleRow>
      <Typography gutterBottom variant="title" align="left" component="h2">
        Mis Guias
      </Typography>
    </TitleRow>
    <Row>
      <GuideTable guides={guides} />
    </Row>
  </Container>
);

GuidesPage.propTypes = {
  guides: PropTypes.arrayOf(object),
};

const MockGuides = [
  {
    id: 1,
    name: 'Test1',
    exercicesCount: 2,
    modifiedDate: '01/01/2018',
  },
  {
    id: 1,
    name: 'Test2',
    exercicesCount: 12,
    modifiedDate: '02/01/2018',
  },
  {
    id: 3,
    name: 'Test3',
    exercicesCount: 9,
    modifiedDate: '03/01/2018',
  },
  {
    id: 4,
    name: 'Test4',
    exercicesCount: 1,
    modifiedDate: '04/01/2018',
  },
  {
    id: 5,
    name: 'Test5',
    exercicesCount: 54,
    modifiedDate: '05/01/2018',
  },
  {
    id: 5,
    name: 'Test5',
    exercicesCount: 54,
    modifiedDate: '05/01/2018',
  },
  {
    id: 5,
    name: 'Test5',
    exercicesCount: 54,
    modifiedDate: '05/01/2018',
  },
  {
    id: 5,
    name: 'Test5',
    exercicesCount: 54,
    modifiedDate: '05/01/2018',
  },
];

export default connect(
  state => ({
    guides: MockGuides,
  }),
  null,
)(GuidesPage);
