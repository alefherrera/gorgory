import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserNameText = styled(Typography)`
  padding: 5px;
  padding-bottom: 20px;
`;

const BigAvatar = styled(Avatar)`
  && {
    margin: 5px;
    margin-top: 12px;
    width: 60px;
    height: 60px;
  }
`;

const UserAvatar = ({ username }) => (
  <Root>
    <BigAvatar>{username && username.charAt(0).toUpperCase()}</BigAvatar>
    <UserNameText variant="subtitle1" noWrap>
      {username}
    </UserNameText>
  </Root>
);

UserAvatar.propTypes = {
  username: PropTypes.string,
};

export default UserAvatar;
