import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './case-result.reducer';
import { ICaseResult } from 'app/shared/model/case-result.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICaseResultProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CaseResult extends React.Component<ICaseResultProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { caseResultList, match } = this.props;
    return (
      <div>
        <h2 id="case-result-heading">
          Case Results
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Case Result
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Passed</th>
                <th>Test Case</th>
                <th>Resolution</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {caseResultList.map((caseResult, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${caseResult.id}`} color="link" size="sm">
                      {caseResult.id}
                    </Button>
                  </td>
                  <td>{caseResult.passed ? 'true' : 'false'}</td>
                  <td>{caseResult.testCase ? <Link to={`test-case/${caseResult.testCase.id}`}>{caseResult.testCase.id}</Link> : ''}</td>
                  <td>
                    {caseResult.resolution ? <Link to={`resolution/${caseResult.resolution.id}`}>{caseResult.resolution.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${caseResult.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${caseResult.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${caseResult.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ caseResult }: IRootState) => ({
  caseResultList: caseResult.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseResult);
