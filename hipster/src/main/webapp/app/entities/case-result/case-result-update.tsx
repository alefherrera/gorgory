import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITestCase } from 'app/shared/model/test-case.model';
import { getEntities as getTestCases } from 'app/entities/test-case/test-case.reducer';
import { IResolution } from 'app/shared/model/resolution.model';
import { getEntities as getResolutions } from 'app/entities/resolution/resolution.reducer';
import { getEntity, updateEntity, createEntity, reset } from './case-result.reducer';
import { ICaseResult } from 'app/shared/model/case-result.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICaseResultUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICaseResultUpdateState {
  isNew: boolean;
  testCaseId: string;
  resolutionId: string;
}

export class CaseResultUpdate extends React.Component<ICaseResultUpdateProps, ICaseResultUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      testCaseId: '0',
      resolutionId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getTestCases();
    this.props.getResolutions();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { caseResultEntity } = this.props;
      const entity = {
        ...caseResultEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/case-result');
  };

  render() {
    const { caseResultEntity, testCases, resolutions, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gorgoryApp.caseResult.home.createOrEditLabel">Create or edit a CaseResult</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : caseResultEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="case-result-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="passedLabel" check>
                    <AvInput id="case-result-passed" type="checkbox" className="form-control" name="passed" />
                    Passed
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="testCase.id">Test Case</Label>
                  <AvInput id="case-result-testCase" type="select" className="form-control" name="testCase.id">
                    <option value="" key="0" />
                    {testCases
                      ? testCases.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="resolution.id">Resolution</Label>
                  <AvInput id="case-result-resolution" type="select" className="form-control" name="resolution.id">
                    <option value="" key="0" />
                    {resolutions
                      ? resolutions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/case-result" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  testCases: storeState.testCase.entities,
  resolutions: storeState.resolution.entities,
  caseResultEntity: storeState.caseResult.entity,
  loading: storeState.caseResult.loading,
  updating: storeState.caseResult.updating
});

const mapDispatchToProps = {
  getTestCases,
  getResolutions,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseResultUpdate);
