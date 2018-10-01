import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IGuide } from 'app/shared/model/guide.model';
import { getEntities as getGuides } from 'app/entities/guide/guide.reducer';
import { getEntity, updateEntity, createEntity, reset } from './exercise.reducer';
import { IExercise } from 'app/shared/model/exercise.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IExerciseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IExerciseUpdateState {
  isNew: boolean;
  guideId: string;
}

export class ExerciseUpdate extends React.Component<IExerciseUpdateProps, IExerciseUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      guideId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getGuides();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { exerciseEntity } = this.props;
      const entity = {
        ...exerciseEntity,
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
    this.props.history.push('/entity/exercise');
  };

  render() {
    const { exerciseEntity, guides, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gorgoryApp.exercise.home.createOrEditLabel">Create or edit a Exercise</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : exerciseEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="exercise-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="languageLabel">Language</Label>
                  <AvInput
                    id="exercise-language"
                    type="select"
                    className="form-control"
                    name="language"
                    value={(!isNew && exerciseEntity.language) || 'PYTHON'}
                  >
                    <option value="PYTHON">PYTHON</option>
                    <option value="JAVA">JAVA</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="guide.id">Guide</Label>
                  <AvInput id="exercise-guide" type="select" className="form-control" name="guide.id">
                    <option value="" key="0" />
                    {guides
                      ? guides.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/exercise" replace color="info">
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
  guides: storeState.guide.entities,
  exerciseEntity: storeState.exercise.entity,
  loading: storeState.exercise.loading,
  updating: storeState.exercise.updating
});

const mapDispatchToProps = {
  getGuides,
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
)(ExerciseUpdate);
