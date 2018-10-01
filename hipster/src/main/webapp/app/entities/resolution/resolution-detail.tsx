import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './resolution.reducer';
import { IResolution } from 'app/shared/model/resolution.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IResolutionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ResolutionDetail extends React.Component<IResolutionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { resolutionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Resolution [<b>{resolutionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="path">Path</span>
            </dt>
            <dd>{resolutionEntity.path}</dd>
            <dt>Student</dt>
            <dd>{resolutionEntity.student ? resolutionEntity.student.id : ''}</dd>
            <dt>Exercise</dt>
            <dd>{resolutionEntity.exercise ? resolutionEntity.exercise.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/resolution" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/resolution/${resolutionEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ resolution }: IRootState) => ({
  resolutionEntity: resolution.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResolutionDetail);
