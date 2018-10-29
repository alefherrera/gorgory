import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 10px;
  margin: 10px;
`;

const IconContainer = styled.div`
  position: relative;
  top: 8px;
`;

const TextFieldContainer = styled.div`
  width: 100%};
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

class SearchBox extends Component {
  handleOnChange = (e) => {
    this.props.onChange(e.target.value);
  };

  render() {
    const { value } = this.props;
    return (
      <Container>
        <IconContainer>
          <IconButton>
            <Search />
          </IconButton>
        </IconContainer>
        <TextFieldContainer>
          <StyledTextField
            onChange={this.handleOnChange}
            type="search"
            value={value}
            label="Buscar"
          />
        </TextFieldContainer>
      </Container>
    );
  }
}

SearchBox.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};

SearchBox.defaultProps = {
  onChange: () => {},
};

export default SearchBox;
