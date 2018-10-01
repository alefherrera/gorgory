import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './exercise.reducer';
import { IExercise } from 'app/shared/model/exercise.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExerciseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ExerciseDetail extends React.Component<IExerciseDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { exerciseEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Exercise [<b>{exerciseEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="language">Language</span>
            </dt>
            <dd>{exerciseEntity.language}</dd>
            <dt>Guide</dt>
            <dd>{exerciseEntity.guide ? exerciseEntity.guide.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/exercise" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/exercise/${exerciseEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ exercise }: IRootState) => ({
  exerciseEntity: exercise.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseDetail);
