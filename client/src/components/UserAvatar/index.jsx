import React from 'react';
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

const UserAvatar = ({ userName }) => (
  <Root>
    <BigAvatar>{userName && userName.charAt(0).toUpperCase()}</BigAvatar>
    <UserNameText variant="h6" gutterBottom>
      {userName}
    </UserNameText>
  </Root>
);

export default UserAvatar;
