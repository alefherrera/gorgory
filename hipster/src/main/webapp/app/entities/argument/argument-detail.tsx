import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './argument.reducer';
import { IArgument } from 'app/shared/model/argument.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IArgumentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ArgumentDetail extends React.Component<IArgumentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { argumentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Argument [<b>{argumentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="value">Value</span>
            </dt>
            <dd>{argumentEntity.value}</dd>
            <dt>Test Case</dt>
            <dd>{argumentEntity.testCase ? argumentEntity.testCase.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/argument" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/argument/${argumentEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ argument }: IRootState) => ({
  argumentEntity: argument.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArgumentDetail);
