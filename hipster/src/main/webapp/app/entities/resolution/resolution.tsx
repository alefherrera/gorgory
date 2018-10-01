import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './resolution.reducer';
import { IResolution } from 'app/shared/model/resolution.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IResolutionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Resolution extends React.Component<IResolutionProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { resolutionList, match } = this.props;
    return (
      <div>
        <h2 id="resolution-heading">
          Resolutions
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Resolution
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Path</th>
                <th>Student</th>
                <th>Exercise</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {resolutionList.map((resolution, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${resolution.id}`} color="link" size="sm">
                      {resolution.id}
                    </Button>
                  </td>
                  <td>{resolution.path}</td>
                  <td>{resolution.student ? resolution.student.id : ''}</td>
                  <td>{resolution.exercise ? <Link to={`exercise/${resolution.exercise.id}`}>{resolution.exercise.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${resolution.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${resolution.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${resolution.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ resolution }: IRootState) => ({
  resolutionList: resolution.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resolution);
