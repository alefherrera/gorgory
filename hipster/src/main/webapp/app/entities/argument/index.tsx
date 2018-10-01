import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Argument from './argument';
import ArgumentDetail from './argument-detail';
import ArgumentUpdate from './argument-update';
import ArgumentDeleteDialog from './argument-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ArgumentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ArgumentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ArgumentDetail} />
      <ErrorBoundaryRoute path={match.url} component={Argument} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ArgumentDeleteDialog} />
  </>
);

export default Routes;
