import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const RootFlexColumn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleTextStyle = styled(Typography)`
  padding-left: 128px;
  margin-bottom: 12px;
`;

export const TitleText = ({ text }) => (
  <TitleTextStyle variant="h3" gutterBottom>
    {text}
  </TitleTextStyle>
);

const FormRoot = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  height: 85%;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: right;
  align-self: flex-end;
  margin: 20px;
`;

export const StyledForm = ({ onSubmit, children }) => (
  <FormRoot>
    <Form onSubmit={onSubmit}>
      <Content>{children}</Content>
      <Buttons>
        <Button type="submit" variant="raised" color="primary">
          Holas
        </Button>
      </Buttons>
    </Form>
  </FormRoot>
);
