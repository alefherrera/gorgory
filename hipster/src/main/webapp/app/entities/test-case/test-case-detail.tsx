import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './test-case.reducer';
import { ITestCase } from 'app/shared/model/test-case.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITestCaseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TestCaseDetail extends React.Component<ITestCaseDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { testCaseEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            TestCase [<b>{testCaseEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="expected">Expected</span>
            </dt>
            <dd>{testCaseEntity.expected}</dd>
            <dt>Exercise</dt>
            <dd>{testCaseEntity.exercise ? testCaseEntity.exercise.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/test-case" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/test-case/${testCaseEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ testCase }: IRootState) => ({
  testCaseEntity: testCase.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestCaseDetail);
