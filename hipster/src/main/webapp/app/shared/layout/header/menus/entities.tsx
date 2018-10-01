import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/guide">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Guide
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/exercise">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Exercise
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/resolution">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Resolution
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/case-result">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Case Result
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/test-case">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Test Case
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/argument">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Argument
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
