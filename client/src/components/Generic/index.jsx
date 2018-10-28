import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export const RootFlexColumn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleTextStyle = styled(Typography)`
  padding-left: 32px;
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
  align-self: flex-start;
  margin: 20px;
`;

const StyledButton = styled(Button)`
  && {
    margin-right: 20px;
  }
`;

export const StyledForm = ({ onSubmit, flat, onCancel, children }) => (
  <FormRoot>
    <Form onSubmit={onSubmit}>
      <Content>{children}</Content>
      <Buttons>
        <StyledButton
          onClick={onCancel}
          variant={flat ? "flat" : "raised"}
          color="secondary"
        >
          Cancelar
        </StyledButton>
        <StyledButton
          type="submit"
          variant={flat ? "flat" : "raised"}
          color="primary"
        >
          Aceptar
        </StyledButton>
      </Buttons>
    </Form>
  </FormRoot>
);
