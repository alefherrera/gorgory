import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Guide from './guide';
import GuideDetail from './guide-detail';
import GuideUpdate from './guide-update';
import GuideDeleteDialog from './guide-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GuideUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GuideUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GuideDetail} />
      <ErrorBoundaryRoute path={match.url} component={Guide} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={GuideDeleteDialog} />
  </>
);

export default Routes;
