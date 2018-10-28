import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 10px;
  min-height: 300px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
`;

const FormComponent = ({
  title, buttonText, onSubmit, children,
}) => (
  <div>
    {title && (
      <Typography gutterBottom variant="title" align="left" component="h2">
        {title}
      </Typography>
    )}
    <Container>
      <Form onSubmit={onSubmit}>
        <Row>{children}</Row>
        <ButtonRow>
          <Button type="submit" variant="raised" color="primary">
            {buttonText}
          </Button>
        </ButtonRow>
      </Form>
    </Container>
  </div>
);

FormComponent.propTypes = {
  title: PropTypes.string,
  buttonText: PropTypes.string,
  children: PropTypes.any,
  onSubmit: PropTypes.func,
};

export default FormComponent;
