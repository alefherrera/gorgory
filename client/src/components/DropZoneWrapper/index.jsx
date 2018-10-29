import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import FieldContainer from '../FieldContainer';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const TextContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const style = {
  borderStyle: 'solid',
  borderRadius: 10,
  borderColor: 'lightgray',
  height: 200,
  width: 200,
};

const TextFieldWrapper = ({ input, label, ...custom }) => (
  <FieldContainer>
    <Container>
      <Dropzone multiple={false} onDrop={input.onChange} {...input} {...custom} style={style}>
        <TextContainer>
          <Typography gutterBottom variant="body1">
            {label}
          </Typography>
        </TextContainer>
      </Dropzone>
    </Container>
  </FieldContainer>
);

TextFieldWrapper.propTypes = {
  input: PropTypes.any,
  label: PropTypes.any,
  meta: PropTypes.object,
};

export default TextFieldWrapper;
