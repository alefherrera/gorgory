import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import SignatureListPage from './SignatureListPage';
import AddSignaturePage from './AddSignaturePage';
import EditSignaturePage from './EditSignaturePage';

const Signature = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}`} component={SignatureListPage} />
    <Route path={`${match.url}/add`} component={AddSignaturePage} />
    <Route path={`${match.url}/edit/:id`} component={EditSignaturePage} />
  </Switch>
);

Signature.propTypes = {
  match: PropTypes.object,
};

export default Signature;
