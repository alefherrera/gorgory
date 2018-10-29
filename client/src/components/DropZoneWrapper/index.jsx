import React, { Component } from 'react';
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

class DropZoneWrapper extends Component {
  state = {
    label: this.props.label,
  };

  handleDrop = (files) => {
    this.setState({ label: files[0].name });
    this.props.input.onChange(files);
  };

  render() {
    const { input, label, ...custom } = this.props;
    return (
      <FieldContainer>
        <Container>
          <Dropzone multiple={false} {...input} {...custom} style={style} onDrop={this.handleDrop}>
            <TextContainer>
              <Typography gutterBottom variant="body1">
                {this.state.label}
              </Typography>
            </TextContainer>
          </Dropzone>
        </Container>
      </FieldContainer>
    );
  }
}

DropZoneWrapper.propTypes = {
  input: PropTypes.any,
  label: PropTypes.any,
  meta: PropTypes.object,
};

export default DropZoneWrapper;
