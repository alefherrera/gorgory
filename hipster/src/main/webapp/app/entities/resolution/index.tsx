import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Resolution from './resolution';
import ResolutionDetail from './resolution-detail';
import ResolutionUpdate from './resolution-update';
import ResolutionDeleteDialog from './resolution-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ResolutionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ResolutionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ResolutionDetail} />
      <ErrorBoundaryRoute path={match.url} component={Resolution} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ResolutionDeleteDialog} />
  </>
);

export default Routes;
