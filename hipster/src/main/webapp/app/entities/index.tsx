import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Guide from './guide';
import Exercise from './exercise';
import Resolution from './resolution';
import CaseResult from './case-result';
import TestCase from './test-case';
import Argument from './argument';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/guide`} component={Guide} />
      <ErrorBoundaryRoute path={`${match.url}/exercise`} component={Exercise} />
      <ErrorBoundaryRoute path={`${match.url}/resolution`} component={Resolution} />
      <ErrorBoundaryRoute path={`${match.url}/case-result`} component={CaseResult} />
      <ErrorBoundaryRoute path={`${match.url}/test-case`} component={TestCase} />
      <ErrorBoundaryRoute path={`${match.url}/argument`} component={Argument} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
