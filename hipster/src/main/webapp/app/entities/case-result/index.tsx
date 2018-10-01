import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CaseResult from './case-result';
import CaseResultDetail from './case-result-detail';
import CaseResultUpdate from './case-result-update';
import CaseResultDeleteDialog from './case-result-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CaseResultUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CaseResultUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CaseResultDetail} />
      <ErrorBoundaryRoute path={match.url} component={CaseResult} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CaseResultDeleteDialog} />
  </>
);

export default Routes;
